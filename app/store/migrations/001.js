import AppConstants from '../../core/AppConstants';
import { toLowerCaseEquals } from '../../util/general';

/**
 * MakerDAO DAI => SAI
 *
 **/

/**
 * Migrates token symbols from DAI to SAI for MakerDAO tokens
 * Updates TokensController state to rename DAI tokens with SAI_ADDRESS to SAI symbol
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with updated token symbols
 */
export default function migrate(state) {
  const tokens = state.engine.backgroundState.TokensController.tokens;
  const migratedTokens = [];
  tokens.forEach((token) => {
    if (
      token.symbol === 'DAI' &&
      toLowerCaseEquals(token.address, AppConstants.SAI_ADDRESS)
    ) {
      token.symbol = 'SAI';
    }
    migratedTokens.push(token);
  });
  state.engine.backgroundState.TokensController.tokens = migratedTokens;

  return state;
}
