'use strict';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ParseOutput } from 'eth-url-parser';
import { AnyAction, Dispatch, Store } from 'redux';
import handleBrowserUrl from './Handlers/handleBrowserUrl';
import handleEthereumUrl from './Handlers/handleEthereumUrl';
import handleRampUrl from './Handlers/handleRampUrl';
import switchNetwork from './Handlers/switchNetwork';
import parseDeeplink from './ParseManager/parseDeeplink';
import approveTransaction from './TransactionManager/approveTransaction';
import { RampType } from '../../reducers/fiatOrders/types';
import { handleSwapUrl } from './Handlers/handleSwapUrl';
import Routes from '../../constants/navigation/Routes';

/**
 * Manages deep link parsing and navigation for the MetaMask mobile application.
 * Handles various types of deep links including Ethereum URLs, browser URLs,
 * ramp URLs for buying/selling crypto, and swap URLs.
 */
class DeeplinkManager {
  public navigation: NavigationProp<ParamListBase>;
  public pendingDeeplink: string | null;
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public dispatch: Dispatch<any>;

  /**
   * Creates a new DeeplinkManager instance.
   *
   * @param navigation - React Navigation instance for handling navigation
   * @param dispatch - Redux dispatch function for state updates
   */
  constructor({
    navigation,
    dispatch,
  }: {
    navigation: NavigationProp<ParamListBase>;
    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch: Store<any, AnyAction>['dispatch'];
  }) {
    this.navigation = navigation;
    this.pendingDeeplink = null;
    this.dispatch = dispatch;
  }

  /**
   * Sets a pending deeplink URL to be processed later.
   *
   * @param url - The deeplink URL to store
   */
  setDeeplink = (url: string) => (this.pendingDeeplink = url);

  /**
   * Retrieves the currently pending deeplink URL.
   *
   * @returns The pending deeplink URL or null if none exists
   */
  getPendingDeeplink = () => this.pendingDeeplink;

  /**
   * Clears the pending deeplink by setting it to null.
   */
  expireDeeplink = () => (this.pendingDeeplink = null);

  /**
   * Method in charge of changing network if is needed
   *
   * @param switchToChainId - Corresponding chain id for new network
   */
  _handleNetworkSwitch = (switchToChainId: `${number}` | undefined) =>
    switchNetwork({
      deeplinkManager: this,
      switchToChainId,
    });

  /**
   * Approves a transaction from an Ethereum URL.
   *
   * @param ethUrl - Parsed Ethereum URL containing transaction details
   * @param origin - Origin of the deeplink request
   */
  _approveTransaction = async (ethUrl: ParseOutput, origin: string) =>
    approveTransaction({
      deeplinkManager: this,
      ethUrl,
      origin,
    });

  /**
   * Handles Ethereum protocol URLs (ethereum:// scheme).
   *
   * @param url - The Ethereum URL to process
   * @param origin - Origin of the deeplink request
   * @returns Promise that resolves when the URL is handled
   */
  async _handleEthereumUrl(url: string, origin: string) {
    return handleEthereumUrl({
      deeplinkManager: this,
      url,
      origin,
    });
  }

  /**
   * Handles browser URLs by opening them in the in-app browser.
   *
   * @param url - The URL to open in the browser
   * @param callback - Optional callback function to execute after handling
   */
  _handleBrowserUrl(url: string, callback?: (url: string) => void) {
    return handleBrowserUrl({
      deeplinkManager: this,
      url,
      callback,
    });
  }

  _handleBuyCrypto(rampPath: string) {
    handleRampUrl({
      rampPath,
      navigation: this.navigation,
      rampType: RampType.BUY,
    });
  }

  _handleSellCrypto(rampPath: string) {
    handleRampUrl({
      rampPath,
      navigation: this.navigation,
      rampType: RampType.SELL,
    });
  }

  // NOTE: open the home screen for new subdomain
  _handleOpenHome() {
    this.navigation.navigate(Routes.WALLET.HOME);
  }

  // NOTE: this will be used for new deeplink subdomain
  _handleSwap(swapPath: string) {
    handleSwapUrl({
      swapPath,
    });
  }
  // NOTE: keeping this for backwards compatibility
  _handleOpenSwap() {
    this.navigation.navigate(Routes.SWAPS);
  }

  async parse(
    url: string,
    {
      browserCallBack,
      origin,
      onHandled,
    }: {
      browserCallBack?: (url: string) => void;
      origin: string;
      onHandled?: () => void;
    },
  ) {
    return await parseDeeplink({
      deeplinkManager: this,
      url,
      origin,
      browserCallBack,
      onHandled,
    });
  }
}

export default DeeplinkManager;
