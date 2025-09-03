import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Routes from '../../../../../constants/navigation/Routes';
import { SendContextProvider } from '../../context/send-context';
import { Confirm } from '../confirm';

import { Send } from './send';

const Stack = createStackNavigator();

/**
 * SendRoot component provides the navigation structure for the send flow
 * Sets up a stack navigator with send and confirmation screens within a SendContextProvider
 * @returns {JSX.Element} Stack navigator with send flow screens
 */
export const SendRoot = () => (
  <SendContextProvider>
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name={Routes.SEND.ROOT} component={Send} />
      <Stack.Screen
        name={Routes.FULL_SCREEN_CONFIRMATIONS.REDESIGNED_CONFIRMATIONS}
        component={Confirm}
      />
    </Stack.Navigator>
  </SendContextProvider>
);
