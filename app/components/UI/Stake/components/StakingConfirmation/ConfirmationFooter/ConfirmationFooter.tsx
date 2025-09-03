import React from 'react';
import { useStyles } from '../../../../../hooks/useStyles';
import styleSheet from './ConfirmationFooter.styles';
import { View } from 'react-native';
import FooterLegalLinks from './LegalLinks/LegalLinks';
import FooterButtonGroup from './FooterButtonGroup/FooterButtonGroup';
import { ConfirmationFooterProps } from './ConfirmationFooterProps.types';

/**
 * ConfirmationFooter component renders the footer section for staking confirmation
 * Contains legal links and action buttons for confirming or canceling staking operations
 * @param {ConfirmationFooterProps} props - Component props
 * @param {string} props.valueWei - The staking value in wei
 * @param {string} props.action - The action type (stake/unstake)
 * @returns {JSX.Element} The rendered confirmation footer with legal links and buttons
 */
const ConfirmationFooter = ({ valueWei, action }: ConfirmationFooterProps) => {
  const { styles } = useStyles(styleSheet, {});

  return (
    <View style={styles.footerContainer}>
      <FooterLegalLinks />
      <FooterButtonGroup valueWei={valueWei} action={action} />
    </View>
  );
};

export default ConfirmationFooter;
