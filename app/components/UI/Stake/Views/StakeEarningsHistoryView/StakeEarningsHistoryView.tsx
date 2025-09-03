import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { strings } from '../../../../../../locales/i18n';
import { useStyles } from '../../../../hooks/useStyles';
import { getStakingNavbar } from '../../../Navbar';
import styleSheet from './StakeEarningsHistoryView.styles';
import { StakeEarningsHistoryViewRouteParams } from './StakeEarningsHistoryView.types';
import EarningsHistory from '../../../Earn/components/Earnings/EarningsHistory/EarningsHistory';

/**
 * StakeEarningsHistoryView displays the earnings history for a staked asset
 * Shows historical earnings data in a scrollable view with custom navigation
 * @returns {JSX.Element} The rendered earnings history view component
 */
const StakeEarningsHistoryView = () => {
  const navigation = useNavigation();
  const route = useRoute<StakeEarningsHistoryViewRouteParams>();
  const { styles, theme } = useStyles(styleSheet, {});
  const { asset } = route.params;

  useEffect(() => {
    navigation.setOptions(
      getStakingNavbar(
        strings('stake.earnings_history_title', {
          ticker: asset.ticker || asset.symbol,
        }),
        navigation,
        theme.colors,
        {
          backgroundColor: theme.colors.background.default,
          hasCancelButton: false,
          hasBackButton: true,
        },
      ),
    );
  }, [navigation, theme.colors, asset.ticker, asset.symbol]);

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View>
        <EarningsHistory asset={asset} />
      </View>
    </ScrollView>
  );
};

export default StakeEarningsHistoryView;
