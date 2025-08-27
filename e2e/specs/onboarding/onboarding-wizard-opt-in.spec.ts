import TestHelpers from '../../helpers';
import { Regression } from '../../tags';
import WalletView from '../../pages/wallet/WalletView';
import SettingsView from '../../pages/Settings/SettingsView';
import SecurityAndPrivacy from '../../pages/Settings/SecurityAndPrivacy/SecurityAndPrivacyView';
import LoginView from '../../pages/wallet/LoginView';
import { CreateNewWallet } from '../../viewHelper';
import TabBarComponent from '../../pages/wallet/TabBarComponent';
import CommonView from '../../pages/CommonView';
import Assertions from '../../framework/Assertions';
import { mockEvents } from '../../api-mocking/mock-config/mock-events';
import {
  getEventsPayloads,
  onboardingEvents,
  filterEvents,
  EventPayload,
} from '../analytics/helpers';
import SoftAssert from '../../utils/SoftAssert';
import { MockttpServer } from 'mockttp';
import { getMockServerPort } from '../../fixtures/utils';
import { startMockServer } from '../../api-mocking/mock-server';
import { Utilities } from '../../framework';

const PASSWORD = '12345678';

const testSpecificMock = {
  POST: [mockEvents.POST.segmentTrack],
};

describe(
  Regression(
    'Onboarding wizard opt-in, metametrics opt out from settings WITH ANALYTICS',
  ),
  () => {
    let mockServer: MockttpServer;
    let eventsBeforeDisablingAnalytics: EventPayload[];

    beforeAll(async () => {
      jest.setTimeout(150000);
      await TestHelpers.reverseServerPort();

      const mockServerPort = getMockServerPort();
      mockServer = await startMockServer(testSpecificMock, mockServerPort);

      await TestHelpers.launchApp({
        permissions: { notifications: 'YES' },
        launchArgs: {
          mockServerPort: `${mockServerPort}`,
        },
      });
    });

    afterAll(async () => {
      if (mockServer) {
        await mockServer.stop();
      }
    });

    it('should create a new wallet with analytics opt-in', async () => {
      await CreateNewWallet({ optInToMetrics: true });
    });

    it('should check that metametrics is enabled in settings', async () => {
      await Assertions.expectElementToBeVisible(
        TabBarComponent.tabBarSettingButton,
      );
      await TabBarComponent.tapSettings();
      await Assertions.expectElementToBeVisible(
        SettingsView.securityAndPrivacyButton,
      );
      await SettingsView.tapSecurityAndPrivacy();
      await SecurityAndPrivacy.scrollToMetaMetrics();
      await Assertions.expectElementToBeVisible(
        SecurityAndPrivacy.metaMetricsToggle,
      );
      await Assertions.expectToggleToBeOn(
        SecurityAndPrivacy.metaMetricsToggle as Promise<Detox.IndexableNativeElement>,
      );
    });

    it('should disable metametrics and track preference change', async () => {
      await SecurityAndPrivacy.tapMetaMetricsToggle();
      await Assertions.expectElementToBeVisible(CommonView.okAlertButton);
      await CommonView.tapOkAlert();
      await Assertions.expectToggleToBeOff(
        SecurityAndPrivacy.metaMetricsToggle as Promise<Detox.IndexableNativeElement>,
      );

      const events = await getEventsPayloads(mockServer);

      const softAssert = new SoftAssert();
      await softAssert.checkAndCollect(async () => {
        const e = filterEvents(
          events,
          onboardingEvents.ANALYTICS_PREFERENCE_SELECTED,
        ) as EventPayload[];
        await Assertions.checkIfValueIsDefined(e);
        await Assertions.checkIfArrayHasLength(e, 1);
        await Assertions.checkIfObjectContains(e[0].properties, {
          has_marketing_consent: false,
          is_metrics_opted_in: true,
          location: 'onboarding_metametrics',
          updated_after_onboarding: false,
        });
      }, 'Analytics Preference Selected (opt-in) was tracked during onboarding and is not tracked after disabling analytics');

      softAssert.throwIfErrors();

      // Store events before terminating app to verify no new events are sent after relaunch
      eventsBeforeDisablingAnalytics = events;

      // Terminating the app for the next test
      await device.terminateApp();
    });

    it('should relaunch and log in, verifying no new MetaMetrics events were sent', async () => {
      // Launch the app for this test
      await device.launchApp({
        launchArgs: {
          mockServerPort: `${getMockServerPort()}`,
          detoxURLBlacklistRegex: Utilities.BlacklistURLs,
        },
      });
      await Assertions.expectElementToBeVisible(LoginView.passwordInput);
      await LoginView.enterPassword(PASSWORD);
      await Assertions.expectElementToBeVisible(WalletView.container);
      // Removed delay - we already wait for wallet view to be visible

      const eventsAfterRelaunch = await getEventsPayloads(mockServer);
      await Assertions.checkIfArrayHasLength(
        eventsAfterRelaunch,
        eventsBeforeDisablingAnalytics.length,
      );
    });

    it('should verify metametrics remains turned off after app restart', async () => {
      await device.disableSynchronization();
      await Assertions.expectElementToBeVisible(
        TabBarComponent.tabBarSettingButton,
      );
      await TabBarComponent.tapSettings();
      await Assertions.expectElementToBeVisible(
        SettingsView.securityAndPrivacyButton,
      );
      await SettingsView.tapSecurityAndPrivacy(); // ANIMATION HERE, we need to be careful with this

      await Assertions.expectElementToBeVisible(
        SecurityAndPrivacy.metaMetricsToggle,
      );

      await SecurityAndPrivacy.scrollToMetaMetrics();
      await Assertions.expectToggleToBeOff(
        SecurityAndPrivacy.metaMetricsToggle as Promise<Detox.IndexableNativeElement>,
      );

      await device.enableSynchronization();
    });
  },
);
