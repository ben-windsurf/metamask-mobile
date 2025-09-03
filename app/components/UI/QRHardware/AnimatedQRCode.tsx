import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { StyleSheet, View } from 'react-native';
import { UR, UREncoder } from '@ngraveio/bc-ur';
import { useTheme } from '../../../util/theme';
import { Theme } from '../../../util/theme/models';

interface IAnimatedQRCodeProps {
  cbor: string;
  type: string;
  shouldPause: boolean;
}

// For NGRAVE ZERO support please keep to a maximum fragment size of 200
const MAX_FRAGMENT_LENGTH = 200;
const QR_CODE_SIZE = 250;

/**
 * Creates styles for the AnimatedQRCode component
 * @param {Theme} theme - The theme object containing color and styling information
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      width: 300,
      height: 300,
      backgroundColor: theme.brandColors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

/**
 * AnimatedQRCode component displays an animated QR code for hardware wallet interactions
 * Cycles through QR code fragments to support large data transmission via QR codes
 * @param {Object} props - Component props
 * @param {string} props.cbor - CBOR encoded data to display as QR code
 * @param {string} props.type - Type identifier for the UR encoding
 * @param {boolean} props.shouldPause - Whether to pause the QR code animation
 * @returns {JSX.Element} Animated QR code component
 */
const AnimatedQRCode = ({ cbor, type, shouldPause }: IAnimatedQRCodeProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const urEncoder = useMemo(
    () =>
      new UREncoder(
        new UR(Buffer.from(cbor, 'hex'), type),
        MAX_FRAGMENT_LENGTH,
      ),
    [cbor, type],
  );

  const [currentQRCode, setCurrentQRCode] = useState(urEncoder.nextPart());

  useEffect(() => {
    if (!shouldPause) {
      const id = setInterval(() => {
        setCurrentQRCode(urEncoder.nextPart());
      }, 250);
      return () => {
        clearInterval(id);
      };
    }
  }, [urEncoder, shouldPause]);

  return (
    <View style={styles.wrapper}>
      <QRCode value={currentQRCode.toUpperCase()} size={QR_CODE_SIZE} />
    </View>
  );
};

export default AnimatedQRCode;
