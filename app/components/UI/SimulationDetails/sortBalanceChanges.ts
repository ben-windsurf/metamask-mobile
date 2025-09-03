import { AssetType, BalanceChange } from './types';

/** Comparator function for comparing two BalanceChange objects. */
type BalanceChangeComparator = (a: BalanceChange, b: BalanceChange) => number;

/** Order of token standards for comparison. */
const assetTypeOrder: AssetType[] = [
  AssetType.Native,
  AssetType.ERC20,
  AssetType.ERC721,
  AssetType.ERC1155,
];

// Compares BalanceChange objects based on token standard.
const byTokenStandard: BalanceChangeComparator = (a, b) => {
  const indexA = assetTypeOrder.indexOf(a.asset.type);
  const indexB = assetTypeOrder.indexOf(b.asset.type);
  return indexA - indexB;
};

/** Array of comparator functions for BalanceChange objects. */
const comparators: BalanceChangeComparator[] = [byTokenStandard];

/**
 * Compares BalanceChange objects based on multiple criteria.
 *
 * @param a - First BalanceChange object to compare
 * @param b - Second BalanceChange object to compare
 * @returns Number indicating sort order (-1, 0, or 1)
 */
export const compareBalanceChanges: BalanceChangeComparator = (a, b) => {
  for (const comparator of comparators) {
    const result = comparator(a, b);
    if (result !== 0) {
      return result;
    }
  }
  return 0;
};

/**
 * Sorts an array of balance changes based on multiple criteria
 *
 * @param balanceChanges - Array of BalanceChange objects to sort
 * @returns New sorted array of BalanceChange objects
 */
export const sortBalanceChanges = (
  balanceChanges: BalanceChange[],
): BalanceChange[] => [...balanceChanges].sort(compareBalanceChanges);
