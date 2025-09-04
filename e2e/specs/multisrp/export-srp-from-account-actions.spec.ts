import { SmokeWalletPlatform } from '../../tags';
import FixtureBuilder from '../../framework/fixtures/FixtureBuilder';
import { withFixtures } from '../../framework/fixtures/FixtureHelper';
import { loginToApp } from '../../viewHelper';
import { goToAccountActions, completeSrpQuiz } from './utils';
import { defaultOptions } from '../../seeder/anvil-manager';

/** Index of the first default HD keyring account for testing */
const FIRST_DEFAULT_HD_KEYRING_ACCOUNT = 0;
/** Index of the first imported HD keyring account for testing */
const FIRST_IMPORTED_HD_KEYRING_ACCOUNT = 2;

/** Default seed recovery phrase from anvil manager options */
const DEFAULT_SRP = defaultOptions.mnemonic;
/** Test seed recovery phrase for imported HD keyring validation */
const IMPORTED_SRP =
  'lazy youth dentist air relief leave neither liquid belt aspect bone frame';

describe(
  SmokeWalletPlatform('Multi-SRP: Exports the correct srp in account actions'),
  () => {
    it('exports the correct srp for the default hd keyring', async () => {
      await withFixtures(
        {
          fixture: new FixtureBuilder()
            .withImportedHdKeyringAndTwoDefaultAccountsOneImportedHdAccountKeyringController()
            .build(),
          restartDevice: true,
        },
        async () => {
          await loginToApp();
          await goToAccountActions(FIRST_DEFAULT_HD_KEYRING_ACCOUNT);
          await completeSrpQuiz(DEFAULT_SRP);
        },
      );
    });

    it('exports the correct srp for the imported hd keyring', async () => {
      await withFixtures(
        {
          fixture: new FixtureBuilder()
            .withImportedHdKeyringAndTwoDefaultAccountsOneImportedHdAccountKeyringController()
            .build(),
          restartDevice: true,
        },
        async () => {
          await loginToApp();
          await goToAccountActions(FIRST_IMPORTED_HD_KEYRING_ACCOUNT);
          await completeSrpQuiz(IMPORTED_SRP);
        },
      );
    });
  },
);
