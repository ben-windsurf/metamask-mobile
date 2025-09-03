/**
 * Migration 012: Rename CollectiblesController to NftController
 * Migrates collectibles-related state properties to use NFT naming convention
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with renamed NFT controllers and properties
 */
export default function migrate(state) {
  const {
    allCollectibles,
    allCollectibleContracts,
    ignoredCollectibles,
    ...unexpectedCollectiblesControllerState
  } = state.engine.backgroundState.CollectiblesController;
  state.engine.backgroundState.NftController = {
    ...unexpectedCollectiblesControllerState,
    allNfts: allCollectibles,
    allNftContracts: allCollectibleContracts,
    ignoredNfts: ignoredCollectibles,
  };
  delete state.engine.backgroundState.CollectiblesController;

  state.engine.backgroundState.NftDetectionController =
    state.engine.backgroundState.CollectibleDetectionController;
  delete state.engine.backgroundState.CollectibleDetectionController;

  state.engine.backgroundState.PreferencesController.useNftDetection =
    state.engine.backgroundState.PreferencesController.useCollectibleDetection;
  delete state.engine.backgroundState.PreferencesController
    .useCollectibleDetection;

  return state;
}
