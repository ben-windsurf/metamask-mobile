import { BackupAndSyncViewSelectorsIDs } from '../../selectors/Settings/BackupAndSyncView.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object for the Backup and Sync settings view in end-to-end tests.
 * Provides methods to interact with backup and sync toggle controls.
 */
class BackupAndSyncView {
  /**
   * Gets the account sync toggle element.
   * @returns The DetoxElement for the account sync toggle
   */
  get accountSyncToggle(): DetoxElement {
    return Matchers.getElementByID(
      BackupAndSyncViewSelectorsIDs.ACCOUNT_SYNC_TOGGLE,
    );
  }

  /**
   * Gets the backup and sync toggle element.
   * @returns The DetoxElement for the backup and sync toggle
   */
  get backupAndSyncToggle(): DetoxElement {
    return Matchers.getElementByID(
      BackupAndSyncViewSelectorsIDs.BACKUP_AND_SYNC_TOGGLE,
    );
  }

  /**
   * Toggles the backup and sync setting by tapping the toggle control.
   * @returns Promise that resolves when the toggle action is complete
   */
  async toggleBackupAndSync() {
    await Gestures.waitAndTap(this.backupAndSyncToggle, {
      elemDescription: 'Backup and Sync Toggle in Backup and Sync View',
    });
  }

  /**
   * Toggles the account sync setting by tapping the toggle control.
   * @returns Promise that resolves when the toggle action is complete
   */
  async toggleAccountSync() {
    await Gestures.waitAndTap(this.accountSyncToggle, {
      elemDescription: 'Account Sync Toggle in Backup and Sync View',
    });
  }
}

export default new BackupAndSyncView();
