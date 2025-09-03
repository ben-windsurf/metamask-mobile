import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from '../../../../constants/navigation/Routes';
import { Confirm } from '../../../Views/confirmations/components/confirm';
import StakeConfirmationView from '../Views/StakeConfirmationView/StakeConfirmationView';
import UnstakeConfirmationView from '../Views/UnstakeConfirmationView/UnstakeConfirmationView';
import { StakeSDKProvider } from '../sdk/stakeSdkProvider';
import MaxInputModal from '../../Earn/components/MaxInputModal';
import GasImpactModal from '../components/GasImpactModal';
import StakeEarningsHistoryView from '../Views/StakeEarningsHistoryView/StakeEarningsHistoryView';
import PoolStakingLearnMoreModal from '../components/PoolStakingLearnMoreModal';
import EarnTokenList from '../../Earn/components/EarnTokenList';
import EarnInputView from '../../Earn/Views/EarnInputView/EarnInputView';
import EarnWithdrawInputView from '../../Earn/Views/EarnWithdrawInputView/EarnWithdrawInputView';

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();

const clearStackNavigatorOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'transparent',
  },
  animationEnabled: false,
};

/**
 * Stack navigator for staking screens
 * Provides navigation between stake input, confirmation, and history screens
 * @returns {JSX.Element} Stack navigator wrapped with StakeSDKProvider
 */
const StakeScreenStack = () => (
  <StakeSDKProvider>
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name={Routes.STAKING.STAKE} component={EarnInputView} />
      <Stack.Screen
        name={Routes.STAKING.UNSTAKE}
        component={EarnWithdrawInputView}
      />
      <Stack.Screen
        name={Routes.STAKING.STAKE_CONFIRMATION}
        component={StakeConfirmationView}
      />
      <Stack.Screen
        name={Routes.STAKING.UNSTAKE_CONFIRMATION}
        component={UnstakeConfirmationView}
      />
      <Stack.Screen
        name={Routes.STAKING.EARNINGS_HISTORY}
        component={StakeEarningsHistoryView}
      />
      <Stack.Screen
        name={Routes.FULL_SCREEN_CONFIRMATIONS.REDESIGNED_CONFIRMATIONS}
        component={Confirm}
      />
    </Stack.Navigator>
  </StakeSDKProvider>
);

/**
 * Modal stack navigator for staking modals
 * Handles modal presentations for learn more, max input, gas impact, and token list
 * @returns {JSX.Element} Modal stack navigator wrapped with StakeSDKProvider
 */
const StakeModalStack = () => (
  <StakeSDKProvider>
    <ModalStack.Navigator
      mode={'modal'}
      screenOptions={clearStackNavigatorOptions}
    >
      <ModalStack.Screen
        name={Routes.STAKING.MODALS.LEARN_MORE}
        component={PoolStakingLearnMoreModal}
        options={{ headerShown: false }}
      />
      <ModalStack.Screen
        name={Routes.STAKING.MODALS.MAX_INPUT}
        component={MaxInputModal}
        options={{ headerShown: false }}
      />
      <ModalStack.Screen
        name={Routes.STAKING.MODALS.GAS_IMPACT}
        component={GasImpactModal}
        options={{ headerShown: false }}
      />
      <ModalStack.Screen
        name={Routes.STAKING.MODALS.EARN_TOKEN_LIST}
        component={EarnTokenList}
        options={{ headerShown: false }}
      />
    </ModalStack.Navigator>
  </StakeSDKProvider>
);

export { StakeScreenStack, StakeModalStack };
