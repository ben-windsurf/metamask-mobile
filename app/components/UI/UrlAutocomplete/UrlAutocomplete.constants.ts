import { UrlAutocompleteCategory } from './types';

/**
 * Maximum number of recent items to display in URL autocomplete
 */
export const MAX_RECENTS = 5;

/**
 * Ordered list of categories for URL autocomplete display
 * Defines the priority order in which categories appear in the autocomplete dropdown
 */
export const ORDERED_CATEGORIES = [
  UrlAutocompleteCategory.Recents,
  UrlAutocompleteCategory.Favorites,
  UrlAutocompleteCategory.Tokens,
  UrlAutocompleteCategory.Sites,
];
