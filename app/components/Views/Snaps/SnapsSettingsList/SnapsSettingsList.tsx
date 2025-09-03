///: BEGIN:ONLY_INCLUDE_IF(external-snaps)
import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { SnapElement } from '../components/SnapElement';
import { getNavigationOptionsTitle } from '../../../UI/Navbar';
import { createNavigationDetails } from '../../../../util/navigation/navUtils';
import Routes from '../../../../constants/navigation/Routes';
import { strings } from '../../../../../locales/i18n';
import { useStyles } from '../../../../component-library/hooks';
import stylesheet from './SnapsSettingsList.styles';
import { Snap } from '@metamask/snaps-utils';
import { selectSnaps } from '../../../../selectors/snaps/snapController';

/**
 * Creates navigation details for the Snaps Settings List screen
 * Used for type-safe navigation to the Snaps settings management view
 * @returns {NavigationDetails} Navigation details object for the Snaps settings list route
 */
export const createSnapsSettingsListNavDetails = createNavigationDetails(
  Routes.SNAPS.SNAPS_SETTINGS_LIST,
);

/**
 * SnapsSettingsList component displays a scrollable list of installed Snaps
 * Allows users to view and manage their installed Snaps from the settings screen
 * Each Snap is rendered as a SnapElement with navigation to individual Snap settings
 * @returns {JSX.Element} The rendered Snaps settings list component
 */
const SnapsSettingsList = () => {
  const navigation = useNavigation();
  const { styles, theme } = useStyles(stylesheet, {});
  const { colors } = theme;
  const snaps = useSelector(selectSnaps);

  useEffect(() => {
    navigation.setOptions(
      getNavigationOptionsTitle(
        strings('app_settings.snaps.title'),
        navigation,
        false,
        colors,
      ),
    );
  }, [colors, navigation, snaps]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {(Object.values(snaps) as Snap[]).map((snap: Snap) => (
          <SnapElement {...snap} key={snap.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default React.memo(SnapsSettingsList);
///: END:ONLY_INCLUDE_IF
