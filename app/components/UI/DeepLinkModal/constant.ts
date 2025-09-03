import { createNavigationDetails } from '../../../util/navigation/navUtils';
import Routes from '../../../constants/navigation/Routes';

/* eslint-disable import/no-commonjs, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */

/**
 * MetaMask fox logo image asset for deep link modal
 */
export const foxLogo = require('../../../images/branding/fox.png');

/**
 * Page not found image asset for deep link modal error states
 */
export const pageNotFound = require('images/page-not-found.png');

/**
 * Navigation details configuration for the deep link modal
 * Defines the modal flow and specific deep link modal route
 */
export const createDeepLinkModalNavDetails = createNavigationDetails(
  Routes.MODAL.ROOT_MODAL_FLOW,
  Routes.MODAL.DEEP_LINK_MODAL,
);
