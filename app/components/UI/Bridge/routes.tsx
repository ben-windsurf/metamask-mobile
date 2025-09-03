import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from '../../../constants/navigation/Routes';
import { BridgeDestTokenSelector } from './components/BridgeDestTokenSelector';
import { BridgeSourceTokenSelector } from './components/BridgeSourceTokenSelector';
import SlippageModal from './components/SlippageModal';
import { BridgeSourceNetworkSelector } from './components/BridgeSourceNetworkSelector';
import { BridgeDestNetworkSelector } from './components/BridgeDestNetworkSelector';
import QuoteInfoModal from './components/QuoteInfoModal';
import BridgeView from './Views/BridgeView';
import BlockExplorersModal from './components/TransactionDetails/BlockExplorersModal';
import QuoteExpiredModal from './components/QuoteExpiredModal';
import BlockaidModal from './components/BlockaidModal';

const clearStackNavigatorOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'transparent',
  },
  animationEnabled: false,
};

const Stack = createStackNavigator();
/**
 * Bridge screen stack navigator component
 * Provides navigation structure for the main bridge view
 * @returns {JSX.Element} Stack navigator with bridge view screen
 */
export const BridgeScreenStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="BridgeView" component={BridgeView} />
  </Stack.Navigator>
);

const ModalStack = createStackNavigator();
/**
 * Bridge modal stack navigator component
 * Provides modal navigation for bridge-related screens including token selectors,
 * network selectors, slippage settings, and transaction details
 * @returns {JSX.Element} Modal stack navigator with all bridge modal screens
 */
export const BridgeModalStack = () => (
  <ModalStack.Navigator
    mode={'modal'}
    screenOptions={clearStackNavigatorOptions}
  >
    <ModalStack.Screen
      name={Routes.BRIDGE.MODALS.SOURCE_TOKEN_SELECTOR}
      component={BridgeSourceTokenSelector}
    />
    <ModalStack.Screen
      name={Routes.BRIDGE.MODALS.DEST_TOKEN_SELECTOR}
      component={BridgeDestTokenSelector}
    />
    <ModalStack.Screen
      name={Routes.BRIDGE.MODALS.SOURCE_NETWORK_SELECTOR}
      component={BridgeSourceNetworkSelector}
    />
    <ModalStack.Screen
      name={Routes.BRIDGE.MODALS.DEST_NETWORK_SELECTOR}
      component={BridgeDestNetworkSelector}
    />
    <ModalStack.Screen
      name={Routes.BRIDGE.MODALS.SLIPPAGE_MODAL}
      component={SlippageModal}
    />
    <ModalStack.Screen
      name={Routes.BRIDGE.MODALS.QUOTE_INFO_MODAL}
      component={QuoteInfoModal}
    />
    <ModalStack.Screen
      name={Routes.BRIDGE.MODALS.TRANSACTION_DETAILS_BLOCK_EXPLORER}
      component={BlockExplorersModal}
    />
    <ModalStack.Screen
      name={Routes.BRIDGE.MODALS.QUOTE_EXPIRED_MODAL}
      component={QuoteExpiredModal}
    />
    <ModalStack.Screen
      name={Routes.BRIDGE.MODALS.BLOCKAID_MODAL}
      component={BlockaidModal}
    />
  </ModalStack.Navigator>
);
