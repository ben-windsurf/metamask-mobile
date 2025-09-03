import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { fontStyles } from '../../../styles/common';
import { useTheme } from '../../../util/theme';
import generateTestId from '../../../../wdio/utils/generateTestId';
import Icon, {
  IconColor,
  IconName,
  IconSize,
} from '../../../component-library/components/Icons/Icon';
import ListItem from '../../../component-library/components/List/ListItem/ListItem';
import ListItemColumn, {
  WidthType,
} from '../../../component-library/components/List/ListItemColumn';
import Text, {
  TextVariant,
  TextColor,
} from '../../../component-library/components/Texts/Text';

/**
 * Creates styles for the SettingsDrawer component
 * @param {Object} colors - Theme colors object
 * @param {string} titleColor - Color for the title text
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = (colors, titleColor) =>
  StyleSheet.create({
    root: {
      backgroundColor: colors.background.default,
      padding: 16,
    },
    action: {
      paddingLeft: 16,
    },
    warningTag: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
      height: 24,
      paddingHorizontal: 8,
      marginTop: 8,
      borderRadius: 12,
      backgroundColor: colors.error.muted,
    },
    warningText: {
      marginLeft: 4,
    },
    menuItemWarningText: {
      color: colors.text.default,
      fontSize: 12,
      ...fontStyles.normal,
    },
  });

const propTypes = {
  title: PropTypes.string,
  /**
   * Additional descriptive text about this option
   */
  description: PropTypes.string,
  /**
   * Disable bottom border
   */
  noBorder: PropTypes.bool,
  /**
   * Handler called when this drawer is pressed
   */
  onPress: PropTypes.func,
  /**
   * Display SettingsNotification
   */
  warning: PropTypes.string,
  /**
   * Display arrow right
   */
  renderArrowRight: PropTypes.bool,
  /**
   * Test id for testing purposes
   */
  testID: PropTypes.string,
  /**
   * Title color
   */
  titleColor: PropTypes.string,
};

const defaultProps = {
  onPress: undefined,
};

/**
 * SettingsDrawer component renders a touchable list item for settings navigation
 * Displays a title, optional description, warning message, and arrow indicator
 * @param {Object} props - Component props
 * @param {string} props.title - The main title text to display
 * @param {string} props.description - Optional descriptive text below the title
 * @param {Function} props.onPress - Handler called when the drawer is pressed
 * @param {string} props.warning - Optional warning message to display
 * @param {boolean} props.renderArrowRight - Whether to show the right arrow (default: true)
 * @param {string} props.testID - Test identifier for testing purposes
 * @param {string} props.titleColor - Color for the title text (default: TextColor.Default)
 * @returns {JSX.Element} The rendered settings drawer component
 */
const SettingsDrawer = ({
  title,
  description,
  onPress,
  warning,
  renderArrowRight = true,
  testID,
  titleColor = TextColor.Default,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors, titleColor);
  return (
    <TouchableOpacity onPress={onPress} {...generateTestId(Platform, testID)}>
      <ListItem style={styles.root} gap={16}>
        <ListItemColumn widthType={WidthType.Fill}>
          <Text variant={TextVariant.BodyLGMedium} color={titleColor}>
            {title}
          </Text>
          {description && (
            <Text variant={TextVariant.BodyMD} color={TextColor.Alternative}>
              {description}
            </Text>
          )}
          {warning && (
            <View style={styles.warningTag}>
              <Icon
                size={IconSize.Sm}
                color={IconColor.Error}
                name={IconName.Danger}
              />
              <Text
                variant={TextVariant.BodyMD}
                color={TextColor.Error}
                style={styles.warningText}
              >
                {warning}
              </Text>
            </View>
          )}
        </ListItemColumn>
        {renderArrowRight && (
          <ListItemColumn>
            <Icon
              style={styles.action}
              size={IconSize.Md}
              name={IconName.ArrowRight}
            />
          </ListItemColumn>
        )}
      </ListItem>
    </TouchableOpacity>
  );
};

SettingsDrawer.propTypes = propTypes;
SettingsDrawer.defaultProps = defaultProps;

export default SettingsDrawer;
