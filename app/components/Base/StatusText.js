import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';
import { StyleSheet } from 'react-native';
import { FIAT_ORDER_STATES } from '../../constants/on-ramp';
import { strings } from '../../../locales/i18n';
import { useTheme } from '../../util/theme';

const styles = StyleSheet.create({
  status: {
    marginTop: 4,
    fontSize: 12,
    letterSpacing: 0.5,
  },
});

/**
 * ConfirmedText component displays text with confirmed status styling
 * Renders green bold text to indicate successful or confirmed states
 * @param {Object} props - Component props
 * @param {string} [props.testID] - Test identifier for automated testing
 * @returns {JSX.Element} Styled text component with confirmed appearance
 */
export const ConfirmedText = ({ testID, ...props }) => (
  <Text testID={testID} bold green style={styles.status} {...props} />
);
ConfirmedText.propTypes = {
  testID: PropTypes.string,
};

/**
 * PendingText component displays text with pending status styling
 * Renders warning-colored bold text to indicate pending or in-progress states
 * @param {Object} props - Component props
 * @param {string} [props.testID] - Test identifier for automated testing
 * @returns {JSX.Element} Styled text component with pending appearance
 */
export const PendingText = ({ testID, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      testID={testID}
      bold
      style={[styles.status, { color: colors.warning.default }]}
      {...props}
    />
  );
};
PendingText.propTypes = {
  testID: PropTypes.string,
};

/**
 * FailedText component displays text with failed status styling
 * Renders error-colored bold text to indicate failed or cancelled states
 * @param {Object} props - Component props
 * @param {string} [props.testID] - Test identifier for automated testing
 * @returns {JSX.Element} Styled text component with failed appearance
 */
export const FailedText = ({ testID, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      testID={testID}
      bold
      style={[styles.status, { color: colors.error.default }]}
      {...props}
    />
  );
};
FailedText.propTypes = {
  testID: PropTypes.string,
};

function StatusText({ status, context, testID, ...props }) {
  switch (status) {
    case 'Confirmed':
    case 'confirmed':
      return (
        <ConfirmedText testID={testID} {...props}>
          {strings(`${context}.${status}`)}
        </ConfirmedText>
      );
    case 'Pending':
    case 'pending':
    case 'Submitted':
    case 'submitted':
      return (
        <PendingText testID={testID} {...props}>
          {strings(`${context}.${status}`)}
        </PendingText>
      );
    case 'Failed':
    case 'Cancelled':
    case 'failed':
    case 'cancelled':
      return (
        <FailedText testID={testID} {...props}>
          {strings(`${context}.${status}`)}
        </FailedText>
      );

    case FIAT_ORDER_STATES.COMPLETED:
      return (
        <ConfirmedText {...props}>
          {strings(`${context}.completed`)}
        </ConfirmedText>
      );
    case FIAT_ORDER_STATES.PENDING:
      return (
        <PendingText {...props}>{strings(`${context}.pending`)}</PendingText>
      );
    case FIAT_ORDER_STATES.FAILED:
      return <FailedText {...props}>{strings(`${context}.failed`)}</FailedText>;
    case FIAT_ORDER_STATES.CANCELLED:
      return (
        <FailedText {...props}>{strings(`${context}.cancelled`)}</FailedText>
      );

    default:
      return (
        <Text bold style={styles.status}>
          {status}
        </Text>
      );
  }
}

StatusText.defaultProps = {
  context: 'transaction',
};

StatusText.propTypes = {
  status: PropTypes.string.isRequired,
  context: PropTypes.string,
  testID: PropTypes.string,
};

export default StatusText;
