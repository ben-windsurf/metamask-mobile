/**
 * Enumeration of pagination operations for navigating through data sets.
 * Used to control pagination direction and reset operations.
 */
enum PAGINATION_OPERATIONS {
  /** Reset to the first page of results */
  GET_FIRST_PAGE = 0,
  /** Move to the next page of results */
  GET_NEXT_PAGE = 1,
  /** Move to the previous page of results */
  GET_PREVIOUS_PAGE = -1,
}

export default PAGINATION_OPERATIONS;
