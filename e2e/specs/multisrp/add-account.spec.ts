import { SmokeWalletPlatform } from '../../tags';
import FixtureBuilder from '../../framework/fixtures/FixtureBuilder';
import { withFixtures } from '../../framework/fixtures/FixtureHelper';
import WalletView from '../../pages/wallet/WalletView';
import { loginToApp } from '../../viewHelper';
import Assertions from '../../framework/Assertions';
import AccountListBottomSheet from '../../pages/wallet/AccountListBottomSheet';
import AddAccountBottomSheet from '../../pages/wallet/AddAccountBottomSheet';
import SRPListItemComponent from '../../pages/wallet/MultiSrp/Common/SRPListItemComponent';
import AddNewHdAccountComponent from '../../pages/wallet/MultiSrp/AddAccountToSrp/AddNewHdAccountComponent';

/**
 * Configuration for the first SRP (Secret Recovery Phrase) used in multi-SRP tests.
 * Contains the index and unique identifier for SRP selection.
 */
const SRP_1 = {
  index: 1,
  id: '01JX9NJ15HPNS6RRRYBCKDK33R',
};

/**
 * Configuration for the second SRP (Secret Recovery Phrase) used in multi-SRP tests.
 * Contains the index and unique identifier for SRP selection.
 */
const SRP_2 = {
  index: 2,
  id: '01JX9NZWRAVQKES02TWSN8GD91',
};

/**
 * Adds a new account to a specific SRP (Secret Recovery Phrase) in the multi-SRP wallet.
 * Navigates through the account creation flow, selects the specified SRP, and creates
 * an account with the given name.
 *
 * @param srp - The SRP configuration object containing index and ID
 * @param srp.index - The 1-based index of the SRP to add the account to
 * @param srp.id - The unique identifier of the SRP
 * @param accountName - The name to assign to the new account
 */
const addAccountToSrp = async (
  srp: { index: number; id: string },
  accountName: string,
) => {
  await AccountListBottomSheet.tapAddAccountButton();
  await AddAccountBottomSheet.tapCreateEthereumAccount();
  await Assertions.expectElementToBeVisible(AddNewHdAccountComponent.container);

  // convert srpNumber to index
  const srpIndex = srp.index - 1;

  if (srpIndex < 0) {
    throw new Error('Invalid SRP number');
  }

  // Need to select the srp if its not the default srp
  if (srpIndex > 0) {
    // Need to tap the first srp to open the list
    await AddNewHdAccountComponent.tapSrpSelector();
    await SRPListItemComponent.tapListItem(srp.id);
  }

  // After entering the name the return key is
  // entered to submit the name and account creation
  if (accountName) {
    await AddNewHdAccountComponent.enterName(accountName);
  } else {
    await AddNewHdAccountComponent.tapConfirm();
  }
  await WalletView.tapIdenticon();
  await Assertions.expectElementToBeVisible(AccountListBottomSheet.accountList);
};

describe(
  SmokeWalletPlatform('Multi-SRP: Add new account to a specific SRP'),
  () => {
    it('adds an account to default SRP and one to the imported SRP', async () => {
      await withFixtures(
        {
          fixture: new FixtureBuilder()
            .withImportedHdKeyringAndTwoDefaultAccountsOneImportedHdAccountKeyringController()
            .build(),
          restartDevice: true,
        },
        async () => {
          await loginToApp();
          await WalletView.tapIdenticon();
          await Assertions.expectElementToBeVisible(
            AccountListBottomSheet.accountList,
          );
          await addAccountToSrp(SRP_1, 'Account 4');
          await addAccountToSrp(SRP_2, 'Account 5');
        },
      );
    });
  },
);
