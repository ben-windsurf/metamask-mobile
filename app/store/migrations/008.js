/**
 * Migration 008: Normalizes ignored tokens format in TokensController
 * Ensures that ignored tokens are stored as arrays of token addresses (strings)
 * rather than mixed formats of token objects or addresses
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with normalized ignored tokens format
 */
export default function migrate(state) {
  // This migration ensures that ignored tokens are in the correct form
  const allIgnoredTokens =
    state.engine.backgroundState.TokensController.allIgnoredTokens || {};
  const ignoredTokens =
    state.engine.backgroundState.TokensController.ignoredTokens || [];

  const reduceTokens = (tokens) =>
    tokens.reduce((final, token) => {
      const tokenAddress =
        (typeof token === 'string' && token) || token?.address || '';
      tokenAddress && final.push(tokenAddress);
      return final;
    }, []);

  const newIgnoredTokens = reduceTokens(ignoredTokens);

  const newAllIgnoredTokens = {};
  Object.entries(allIgnoredTokens).forEach(
    ([chainId, tokensByAccountAddress]) => {
      Object.entries(tokensByAccountAddress).forEach(
        ([accountAddress, tokens]) => {
          const newTokens = reduceTokens(tokens);
          if (newAllIgnoredTokens[chainId] === undefined) {
            newAllIgnoredTokens[chainId] = { [accountAddress]: newTokens };
          } else {
            newAllIgnoredTokens[chainId] = {
              ...newAllIgnoredTokens[chainId],
              [accountAddress]: newTokens,
            };
          }
        },
      );
    },
  );

  state.engine.backgroundState.TokensController = {
    ...state.engine.backgroundState.TokensController,
    allIgnoredTokens: newAllIgnoredTokens,
    ignoredTokens: newIgnoredTokens,
  };

  return state;
}
