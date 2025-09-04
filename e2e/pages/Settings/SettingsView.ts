import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import {
  SettingsViewSelectorsIDs,
  SettingsViewSelectorsText,
} from '../../selectors/Settings/SettingsView.selectors';
import { CommonSelectorsText } from '../../selectors/Common.selectors';

/**
 * Page object model for the Settings view in the MetaMask mobile app.
 * Provides methods to interact with various settings sections and buttons.
 */
class SettingsView {
  /**
   * Gets the General Settings button element.
   * @returns The DetoxElement for the general settings button
   */
  get generalSettingsButton(): DetoxElement {
    return Matchers.getElementByID(SettingsViewSelectorsIDs.GENERAL);
  }

  /**
   * Gets the Advanced Settings button element.
   * @returns The DetoxElement for the advanced settings button
   */
  get advancedButton(): DetoxElement {
    return Matchers.getElementByID(SettingsViewSelectorsIDs.ADVANCED);
  }

  /**
   * Gets the Contacts Settings button element.
   * @returns The DetoxElement for the contacts settings button
   */
  get contactsSettingsButton(): DetoxElement {
    return Matchers.getElementByID(SettingsViewSelectorsIDs.CONTACTS);
  }

  /**
   * Gets the Security and Privacy Settings button element.
   * @returns The DetoxElement for the security and privacy settings button
   */
  get securityAndPrivacyButton(): DetoxElement {
    return Matchers.getElementByID(SettingsViewSelectorsIDs.SECURITY);
  }

  /**
   * Gets the Networks Settings button element.
   * @returns The DetoxElement for the networks settings button
   */
  get networksButton(): DetoxElement {
    return Matchers.getElementByID(SettingsViewSelectorsIDs.NETWORKS);
  }

  /**
   * Gets the Notifications Settings button element.
   * @returns The DetoxElement for the notifications settings button
   */
  get notificationsButton(): DetoxElement {
    return Matchers.getElementByID(SettingsViewSelectorsIDs.NOTIFICATIONS);
  }

  get aesCryptoTestForm(): DetoxElement {
    return Matchers.getElementByID(
      SettingsViewSelectorsIDs.AES_CRYPTO_TEST_FORM,
    );
  }

  get lockSettingsButton(): DetoxElement {
    return Matchers.getElementByID(SettingsViewSelectorsIDs.LOCK);
  }
  get contactSupportButton(): DetoxElement {
    return Matchers.getElementByID(SettingsViewSelectorsIDs.CONTACT);
  }

  get contactSupportSectionTitle(): DetoxElement {
    return Matchers.getElementByText(
      SettingsViewSelectorsText.CONTACT_SUPPORT_TITLE,
    );
  }

  get backupAndSyncSectionButton(): DetoxElement {
    return Matchers.getElementByID(SettingsViewSelectorsIDs.BACKUP_AND_SYNC);
  }

  get alertButton(): DetoxElement {
    return device.getPlatform() === 'android'
      ? Matchers.getElementByText(CommonSelectorsText.YES_ALERT_BUTTON)
      : Matchers.getElementByLabel(CommonSelectorsText.YES_ALERT_BUTTON);
  }

  get scrollViewIdentifier(): Promise<DetoxMatcher> {
    return Matchers.getIdentifier(SettingsViewSelectorsIDs.SETTINGS_SCROLL_ID);
  }

  async scrollToLockButton(): Promise<void> {
    await Gestures.scrollToElement(
      this.lockSettingsButton,
      this.scrollViewIdentifier,
      {
        elemDescription: 'Scroll to Lock Button',
      },
    );
  }

  async scrollToContactSupportButton(): Promise<void> {
    await Gestures.scrollToElement(
      this.contactSupportButton,
      this.scrollViewIdentifier,
      {
        elemDescription: 'Scroll to Contact Support Button',
      },
    );
  }

  async scrollToAesCryptoButton(): Promise<void> {
    await Gestures.scrollToElement(
      this.aesCryptoTestForm,
      this.scrollViewIdentifier,
      {
        elemDescription: 'Scroll to AES Crypto Test Form Button',
      },
    );
  }

  async tapGeneralSettings(): Promise<void> {
    await Gestures.waitAndTap(this.generalSettingsButton, {
      elemDescription: 'Settings - General Settings Button',
    });
  }

  async tapAdvancedTitle(): Promise<void> {
    await Gestures.waitAndTap(this.advancedButton, {
      elemDescription: 'Settings - Advanced Settings Button',
    });
  }

  async tapContactsSettings(): Promise<void> {
    await Gestures.waitAndTap(this.contactsSettingsButton, {
      elemDescription: 'Settings - Contacts Settings Button',
    });
  }

  async tapSecurityAndPrivacy(): Promise<void> {
    await Gestures.waitAndTap(this.securityAndPrivacyButton, {
      elemDescription: 'Settings - Security and Privacy Button',
    });
  }

  async tapNetworks(): Promise<void> {
    await Gestures.waitAndTap(this.networksButton, {
      elemDescription: 'Settings - Networks Button',
    });
  }

  async tapNotifications(): Promise<void> {
    await Gestures.waitAndTap(this.notificationsButton, {
      elemDescription: 'Settings - Notifications Button',
    });
  }

  async tapContacts(): Promise<void> {
    await Gestures.waitAndTap(this.contactsSettingsButton, {
      elemDescription: 'Settings - Contacts Settings Button',
    });
  }

  async tapAesCryptoTestForm(): Promise<void> {
    await Gestures.waitAndTap(this.aesCryptoTestForm, {
      elemDescription: 'Settings - AES Crypto Test Form Button',
    });
  }

  async tapLock(): Promise<void> {
    await this.scrollToLockButton();
    await Gestures.waitAndTap(this.lockSettingsButton, {
      elemDescription: 'Settings - Lock Settings Button',
    });
  }
  async tapContactSupport(): Promise<void> {
    await this.scrollToLockButton();
    await Gestures.waitAndTap(this.contactSupportButton, {
      elemDescription: 'Settings - Contact Support Button',
    });
  }

  async tapYesAlertButton(): Promise<void> {
    await Gestures.tap(this.alertButton, {
      elemDescription: 'Settings - Alert Yes Button',
    });
  }

  async tapBackupAndSync(): Promise<void> {
    await Gestures.tap(this.backupAndSyncSectionButton, {
      elemDescription: 'Settings - Backup and Sync Section Button',
    });
  }
}

export default new SettingsView();
