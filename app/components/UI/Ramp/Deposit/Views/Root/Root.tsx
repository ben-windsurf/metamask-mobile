import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../../../../../constants/navigation/Routes';
import { useDepositSDK } from '../../sdk';
import GetStarted from './GetStarted/GetStarted';
import { useSelector } from 'react-redux';
import { getOrders } from '../../../../../../reducers/fiatOrders';
import {
  FIAT_ORDER_STATES,
  FIAT_ORDER_PROVIDERS,
} from '../../../../../../constants/on-ramp';
import { createBankDetailsNavDetails } from '../BankDetails/BankDetails';

/**
 * Root component for the deposit flow that manages navigation and initialization
 * Handles checking for existing tokens, managing deposit orders, and routing to appropriate screens
 * @returns {JSX.Element} The GetStarted component as the initial screen
 */
const Root = () => {
  const navigation = useNavigation();
  const [initialRoute] = useState<string>(Routes.DEPOSIT.BUILD_QUOTE);
  const { checkExistingToken, getStarted } = useDepositSDK();
  const hasCheckedToken = useRef(false);
  const orders = useSelector(getOrders);

  useEffect(() => {
    const initializeFlow = async () => {
      if (hasCheckedToken.current) return;
      await checkExistingToken();
      hasCheckedToken.current = true;
    };
    initializeFlow();
  }, [checkExistingToken]);

  useEffect(() => {
    if (initialRoute === null || !getStarted) return;

    const createdOrder = orders.find(
      (order) =>
        order.provider === FIAT_ORDER_PROVIDERS.DEPOSIT &&
        order.state === FIAT_ORDER_STATES.CREATED,
    );

    if (createdOrder) {
      const [routeName, params] = createBankDetailsNavDetails({
        orderId: createdOrder.id,
      });
      navigation.reset({
        index: 0,
        routes: [
          { name: routeName, params: { ...params, animationEnabled: false } },
        ],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: initialRoute, params: { animationEnabled: false } }],
      });
    }
  }, [getStarted, initialRoute, navigation, orders]);

  return <GetStarted />;
};

export default Root;
