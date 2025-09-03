/* eslint-disable react/display-name */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from '../../Base/Text';
import StyledButton from '../StyledButton';
import RangeInput from '../../Base/RangeInput';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import InfoModal from '../Swaps/components/InfoModal';
import Icon from 'react-native-vector-icons/Ionicons';
import { strings } from '../../../../locales/i18n';
import Alert, { AlertType } from '../../Base/Alert';
import HorizontalSelector from '../../Base/HorizontalSelector';
import Device from '../../../util/device';
import { getDecimalChainId, isMainnetByChainId } from '../../../util/networks';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import FadeAnimationView from '../FadeAnimationView';
import { MetaMetricsEvents } from '../../../core/Analytics';

import TimeEstimateInfoModal from '../TimeEstimateInfoModal';
import useModalHandler from '../../Base/hooks/useModalHandler';
import AppConstants from '../../../core/AppConstants';
import { useTheme } from '../../../util/theme';
import {
  GAS_LIMIT_INCREMENT,
  GAS_PRICE_INCREMENT as GAS_INCREMENT,
  GAS_LIMIT_MIN,
  GAS_PRICE_MIN as GAS_MIN,
} from '../../../util/gasUtils';
import { useMetrics } from '../../../components/hooks/useMetrics';

/**
 * Creates styles for the EditGasFee1559 component
 * @param {Object} colors - Theme colors object
 * @returns {Object} StyleSheet object with component styles
 */
const createStyles = (colors) =>
  StyleSheet.create({
    root: {
      backgroundColor: colors.background.default,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      minHeight: 200,
      maxHeight: '95%',
      paddingTop: 24,
      paddingBottom: Device.isIphoneX() ? 32 : 24,
    },
    wrapper: {
      paddingHorizontal: 24,
    },
    customGasHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingBottom: 20,
    },
    newGasFeeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center',
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: 22,
    },
    headerText: {
      fontSize: 48,
      flex: 1,
      textAlign: 'center',
    },
    headerTitle: {
      flexDirection: 'row',
    },
    saveButton: {
      marginBottom: 20,
    },
    labelTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    hitSlop: {
      top: 10,
      left: 10,
      bottom: 10,
      right: 10,
    },
    labelInfo: {
      color: colors.text.muted,
    },
    advancedOptionsContainer: {
      marginTop: 25,
      marginBottom: 30,
    },
    advancedOptionsInputsContainer: {
      marginTop: 14,
    },
    rangeInputContainer: {
      marginBottom: 20,
    },
    advancedOptionsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    advancedOptionsIcon: {
      paddingTop: 1,
      marginLeft: 5,
    },
    learnMoreLabels: {
      marginTop: 9,
    },
    /* Add when the learn more link is ready
  learnMoreLink: {
    marginTop: 14
  },*/
    warningTextContainer: {
      lineHeight: 20,
      paddingLeft: 4,
      flex: 1,
    },
    warningText: {
      lineHeight: 20,
      flex: 1,
      color: colors.text.default,
    },
    warningContainer: {
      marginBottom: 20,
    },
    dappEditGasContainer: {
      marginVertical: 20,
    },
    subheader: {
      marginBottom: 6,
    },
    learnMoreModal: {
      maxHeight: Device.getDeviceHeight() * 0.7,
    },
    redInfo: {
      marginLeft: 2,
      color: colors.error.default,
    },
  });

/**
 * EditGasFee1559 component provides an interface for editing EIP-1559 gas fees
 * Allows users to select gas fee options (low, medium, high) and customize advanced settings
 * Includes validation, warnings, and real-time fee calculations with time estimates
 *
 * Note: This component will be deprecated in favor of EditGasFee1559Update as part of the gas polling refactor
 * @param {Object} props - Component props
 * @param {string} props.selected - Currently selected gas option
 * @param {Object} props.gasFee - Current gas fee configuration
 * @param {Object} props.gasOptions - Available gas fee options
 * @param {Function} props.onChange - Callback when gas fee changes
 * @param {Function} props.onCancel - Callback when user cancels
 * @param {Function} props.onSave - Callback when user saves changes
 * @param {string} props.gasFeeNative - Gas fee in native currency
 * @param {string} props.gasFeeConversion - Gas fee in converted currency
 * @param {string} props.gasFeeMaxNative - Maximum gas fee in native currency
 * @param {string} props.gasFeeMaxConversion - Maximum gas fee in converted currency
 * @param {string} props.maxPriorityFeeNative - Max priority fee in native currency
 * @param {string} props.maxPriorityFeeConversion - Max priority fee in converted currency
 * @param {string} props.maxFeePerGasNative - Max fee per gas in native currency
 * @param {string} props.maxFeePerGasConversion - Max fee per gas in converted currency
 * @param {string} props.primaryCurrency - Primary currency for display
 * @param {string} props.chainId - Current chain ID
 * @param {string} props.timeEstimate - Estimated confirmation time
 * @param {string} props.timeEstimateColor - Color for time estimate display
 * @param {string} props.timeEstimateId - ID for time estimate
 * @param {string} props.error - Error message to display
 * @param {string} props.warning - Warning message to display
 * @param {boolean} props.dappSuggestedGas - Whether gas is suggested by dapp
 * @param {Array} props.ignoreOptions - Gas options to ignore
 * @param {Object} props.updateOption - Update transaction options
 * @param {Object} props.extendOptions - Extended options for gas selection
 * @param {Object} props.recommended - Recommended gas option
 * @param {string} props.warningMinimumEstimateOption - Warning minimum estimate option
 * @param {string} props.suggestedEstimateOption - Suggested estimate option
 * @param {boolean} props.animateOnChange - Whether to animate on value changes
 * @param {boolean} props.isAnimating - Whether component is currently animating
 * @param {Function} props.onUpdatingValuesStart - Callback when value updates start
 * @param {Function} props.onUpdatingValuesEnd - Callback when value updates end
 * @param {Object} props.analyticsParams - Analytics parameters
 * @param {string} props.view - Current view context
 * @returns {JSX.Element} The EditGasFee1559 component
 */
const EditGasFee1559 = ({
  selected,
  gasFee,
  gasOptions,
  onChange,
  onCancel,
  onSave,
  gasFeeNative,
  gasFeeConversion,
  gasFeeMaxNative,
  gasFeeMaxConversion,
  maxPriorityFeeNative,
  maxPriorityFeeConversion,
  maxFeePerGasNative,
  maxFeePerGasConversion,
  primaryCurrency,
  chainId,
  timeEstimate,
  timeEstimateColor,
  timeEstimateId,
  error,
  warning,
  dappSuggestedGas,
  ignoreOptions,
  updateOption,
  extendOptions = {},
  recommended,
  warningMinimumEstimateOption,
  suggestedEstimateOption,
  animateOnChange,
  isAnimating,
  onUpdatingValuesStart,
  onUpdatingValuesEnd,
  analyticsParams,
  view,
}) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(!selected);
  const [maxPriorityFeeError, setMaxPriorityFeeError] = useState(null);
  const [maxFeeError, setMaxFeeError] = useState(null);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected);
  const [showInputs, setShowInputs] = useState(!dappSuggestedGas);
  const [
    isVisibleTimeEstimateInfoModal,
    ,
    showTimeEstimateInfoModal,
    hideTimeEstimateInfoModal,
  ] = useModalHandler(false);
  const { colors } = useTheme();
  const { trackEvent, createEventBuilder } = useMetrics();

  const styles = createStyles(colors);

  const getAnalyticsParams = () => {
    try {
      return {
        ...analyticsParams,
        chain_id: getDecimalChainId(chainId),
        function_type: view,
        gas_mode: selectedOption ? 'Basic' : 'Advanced',
        speed_set: selectedOption || undefined,
      };
    } catch (error) {
      return {};
    }
  };

  const toggleAdvancedOptions = () => {
    if (!showAdvancedOptions) {
      trackEvent(
        createEventBuilder(MetaMetricsEvents.GAS_ADVANCED_OPTIONS_CLICKED)
          .addProperties(getAnalyticsParams())
          .build(),
      );
    }
    setShowAdvancedOptions((showAdvancedOptions) => !showAdvancedOptions);
  };

  const toggleLearnMoreModal = () => {
    setShowLearnMoreModal((showLearnMoreModal) => !showLearnMoreModal);
  };

  const save = () => {
    trackEvent(
      createEventBuilder(MetaMetricsEvents.GAS_FEE_CHANGED)
        .addProperties(getAnalyticsParams())
        .build(),
    );

    onSave(selectedOption);
  };

  const changeGas = (gas, selectedOption) => {
    setSelectedOption(selectedOption);
    onChange(gas, selectedOption);
  };

  const changedMaxPriorityFee = (value) => {
    const lowerValue = new BigNumber(
      gasOptions?.[warningMinimumEstimateOption]?.suggestedMaxPriorityFeePerGas,
    );
    const higherValue = new BigNumber(
      gasOptions?.high?.suggestedMaxPriorityFeePerGas,
    ).multipliedBy(new BigNumber(1.5));
    const updateFloor = new BigNumber(updateOption?.maxPriortyFeeThreshold);

    const valueBN = new BigNumber(value);

    if (updateFloor && !updateFloor.isNaN() && valueBN.lt(updateFloor)) {
      setMaxPriorityFeeError(
        updateOption?.isCancel
          ? strings('edit_gas_fee_eip1559.max_priority_fee_cancel_low', {
              cancel_value: updateFloor,
            })
          : strings('edit_gas_fee_eip1559.max_priority_fee_speed_up_low', {
              speed_up_floor_value: updateFloor,
            }),
      );
    } else if (!lowerValue.isNaN() && valueBN.lt(lowerValue)) {
      setMaxPriorityFeeError(
        strings('edit_gas_fee_eip1559.max_priority_fee_low'),
      );
    } else if (!higherValue.isNaN() && valueBN.gt(higherValue)) {
      setMaxPriorityFeeError(
        strings('edit_gas_fee_eip1559.max_priority_fee_high'),
      );
    } else {
      setMaxPriorityFeeError('');
    }

    const newGas = { ...gasFee, suggestedMaxPriorityFeePerGas: value };

    changeGas(newGas, null);
  };

  const changedMaxFeePerGas = (value) => {
    const lowerValue = new BigNumber(
      gasOptions?.[warningMinimumEstimateOption]?.suggestedMaxFeePerGas,
    );
    const higherValue = new BigNumber(
      gasOptions?.high?.suggestedMaxFeePerGas,
    ).multipliedBy(new BigNumber(1.5));
    const updateFloor = new BigNumber(updateOption?.maxFeeThreshold);

    const valueBN = new BigNumber(value);

    if (updateFloor && !updateFloor.isNaN() && valueBN.lt(updateFloor)) {
      setMaxFeeError(
        updateOption?.isCancel
          ? strings('edit_gas_fee_eip1559.max_fee_cancel_low', {
              cancel_value: updateFloor,
            })
          : strings('edit_gas_fee_eip1559.max_fee_speed_up_low', {
              speed_up_floor_value: updateFloor,
            }),
      );
    } else if (!lowerValue.isNaN() && valueBN.lt(lowerValue)) {
      setMaxFeeError(strings('edit_gas_fee_eip1559.max_fee_low'));
    } else if (!higherValue.isNaN() && valueBN.gt(higherValue)) {
      setMaxFeeError(strings('edit_gas_fee_eip1559.max_fee_high'));
    } else {
      setMaxFeeError('');
    }

    const newGas = { ...gasFee, suggestedMaxFeePerGas: value };
    changeGas(newGas, null);
  };

  const changedGasLimit = (value) => {
    const newGas = { ...gasFee, suggestedGasLimit: value };
    changeGas(newGas, null);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setMaxFeeError('');
    setMaxPriorityFeeError('');
    changeGas({ ...gasOptions[option] }, option);
  };

  const shouldIgnore = (option) =>
    ignoreOptions.find((item) => item === option);

  const renderLabel = (selected, disabled, label) => (
    <Text bold primary={selected && !disabled}>
      {label}
    </Text>
  );

  const renderOptions = () =>
    [
      {
        name: AppConstants.GAS_OPTIONS.LOW,
        label: strings('edit_gas_fee_eip1559.low'),
      },
      {
        name: AppConstants.GAS_OPTIONS.MEDIUM,
        label: strings('edit_gas_fee_eip1559.market'),
      },
      {
        name: AppConstants.GAS_OPTIONS.HIGH,
        label: strings('edit_gas_fee_eip1559.aggressive'),
      },
    ]
      .filter(({ name }) => !shouldIgnore(name))
      .map(({ name, label, ...option }) => ({
        name,
        label: renderLabel(selectedOption === name, false, label),
        topLabel: recommended?.name === name && recommended.render,
        ...option,
        ...extendOptions[name],
      }));

  const isMainnet = isMainnetByChainId(chainId);
  const nativeCurrencySelected = primaryCurrency === 'ETH' || !isMainnet;
  let gasFeePrimary,
    gasFeeMaxPrimary,
    maxFeePerGasPrimary,
    maxPriorityFeePerGasPrimary,
    gasFeeMaxSecondary;
  if (nativeCurrencySelected) {
    gasFeePrimary = gasFeeNative;
    gasFeeMaxPrimary = gasFeeMaxNative;
    gasFeeMaxSecondary = gasFeeMaxConversion;
    maxFeePerGasPrimary = maxFeePerGasNative;
    maxPriorityFeePerGasPrimary = maxPriorityFeeNative;
  } else {
    gasFeePrimary = gasFeeConversion;
    gasFeeMaxPrimary = gasFeeMaxConversion;
    gasFeeMaxSecondary = gasFeeMaxNative;
    maxFeePerGasPrimary = maxFeePerGasConversion;
    maxPriorityFeePerGasPrimary = maxPriorityFeeConversion;
  }

  const valueToWatch = `${gasFeeNative}${gasFeeMaxNative}`;

  const renderInputs = () => (
    <View>
      <FadeAnimationView
        valueToWatch={valueToWatch}
        animateOnChange={animateOnChange}
        onAnimationStart={onUpdatingValuesStart}
        onAnimationEnd={onUpdatingValuesEnd}
      >
        <View>
          {/* TODO(eip1559) hook with strings i18n */}
          <HorizontalSelector
            selected={selectedOption}
            onPress={selectOption}
            options={renderOptions()}
          />
        </View>
        <View style={styles.advancedOptionsContainer}>
          <TouchableOpacity
            disable={updateOption?.showAdvanced}
            onPress={toggleAdvancedOptions}
            style={styles.advancedOptionsButton}
          >
            <Text noMargin link bold>
              {strings('edit_gas_fee_eip1559.advanced_options')}
            </Text>
            <Text noMargin link bold style={styles.advancedOptionsIcon}>
              <Icon name={`arrow-${showAdvancedOptions ? 'up' : 'down'}`} />
            </Text>
          </TouchableOpacity>
          {(showAdvancedOptions || updateOption?.showAdvanced) && (
            <View style={styles.advancedOptionsInputsContainer}>
              <View style={styles.rangeInputContainer}>
                <RangeInput
                  leftLabelComponent={
                    <View style={styles.labelTextContainer}>
                      <Text black bold noMargin>
                        {strings('edit_gas_fee_eip1559.gas_limit')}{' '}
                      </Text>

                      <TouchableOpacity
                        hitSlop={styles.hitSlop}
                        onPress={() => setShowInfoModal('gas_limit')}
                      >
                        <MaterialCommunityIcon
                          name="information"
                          size={14}
                          style={styles.labelInfo}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                  min={GAS_LIMIT_MIN}
                  value={gasFee.suggestedGasLimit}
                  onChangeValue={changedGasLimit}
                  name={strings('edit_gas_fee_eip1559.gas_limit')}
                  increment={GAS_LIMIT_INCREMENT}
                />
              </View>
              <View style={styles.rangeInputContainer}>
                <RangeInput
                  leftLabelComponent={
                    <View style={styles.labelTextContainer}>
                      <Text black bold noMargin>
                        {strings('edit_gas_fee_eip1559.max_priority_fee')}{' '}
                      </Text>

                      <TouchableOpacity
                        hitSlop={styles.hitSlop}
                        onPress={() => setShowInfoModal('max_priority_fee')}
                      >
                        <MaterialCommunityIcon
                          name="information"
                          size={14}
                          style={styles.labelInfo}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                  rightLabelComponent={
                    <Text noMargin small grey>
                      <Text bold reset>
                        {strings('edit_gas_fee_eip1559.estimate')}:
                      </Text>{' '}
                      {
                        gasOptions?.[suggestedEstimateOption]
                          ?.suggestedMaxPriorityFeePerGas
                      }{' '}
                      GWEI
                    </Text>
                  }
                  value={gasFee.suggestedMaxPriorityFeePerGas}
                  name={strings('edit_gas_fee_eip1559.max_priority_fee')}
                  unit={'GWEI'}
                  min={GAS_MIN}
                  increment={GAS_INCREMENT}
                  inputInsideLabel={
                    maxPriorityFeePerGasPrimary &&
                    `≈ ${maxPriorityFeePerGasPrimary}`
                  }
                  error={maxPriorityFeeError}
                  onChangeValue={changedMaxPriorityFee}
                />
              </View>
              <View style={styles.rangeInputContainer}>
                <RangeInput
                  leftLabelComponent={
                    <View style={styles.labelTextContainer}>
                      <Text
                        black={!maxFeeError}
                        red={Boolean(maxFeeError)}
                        bold
                        noMargin
                      >
                        {strings('edit_gas_fee_eip1559.max_fee')}{' '}
                      </Text>

                      <TouchableOpacity
                        hitSlop={styles.hitSlop}
                        onPress={() => setShowInfoModal('max_fee')}
                      >
                        <MaterialCommunityIcon
                          name="information"
                          size={14}
                          style={styles.labelInfo}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                  rightLabelComponent={
                    <Text noMargin small grey>
                      <Text bold reset>
                        {strings('edit_gas_fee_eip1559.estimate')}:
                      </Text>{' '}
                      {
                        gasOptions?.[suggestedEstimateOption]
                          ?.suggestedMaxFeePerGas
                      }{' '}
                      GWEI
                    </Text>
                  }
                  value={gasFee.suggestedMaxFeePerGas}
                  name={strings('edit_gas_fee_eip1559.max_fee')}
                  unit={'GWEI'}
                  min={GAS_MIN}
                  increment={GAS_INCREMENT}
                  error={maxFeeError}
                  onChangeValue={changedMaxFeePerGas}
                  inputInsideLabel={
                    maxFeePerGasPrimary && `≈ ${maxFeePerGasPrimary}`
                  }
                />
              </View>
            </View>
          )}
        </View>
      </FadeAnimationView>
      <View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={toggleLearnMoreModal}
        >
          <Text link centered>
            {strings('edit_gas_fee_eip1559.learn_more.title')}
          </Text>
        </TouchableOpacity>
        <StyledButton
          type={'confirm'}
          onPress={save}
          disabled={Boolean(error) || isAnimating}
        >
          {updateOption
            ? strings('edit_gas_fee_eip1559.submit')
            : strings('edit_gas_fee_eip1559.save')}
        </StyledButton>
      </View>
    </View>
  );

  const renderWarning = () => {
    if (!warning) return null;
    if (typeof warning === 'string')
      return (
        <Alert
          small
          type={AlertType.Warning}
          renderIcon={() => (
            <MaterialCommunityIcon
              name="information"
              size={20}
              color={colors.warning.default}
            />
          )}
          style={styles.warningContainer}
        >
          {() => (
            <View style={styles.warningTextContainer}>
              <Text black style={styles.warningText}>
                {warning}
              </Text>
            </View>
          )}
        </Alert>
      );

    return warning;
  };

  const renderError = () => {
    if (!error) return null;
    if (typeof error === 'string')
      return (
        <Alert
          small
          type={AlertType.Error}
          renderIcon={() => (
            <MaterialCommunityIcon
              name="information"
              size={20}
              color={colors.error.default}
            />
          )}
          style={styles.warningContainer}
        >
          {() => (
            <View style={styles.warningTextContainer}>
              <Text red style={styles.warningText}>
                {error}
              </Text>
            </View>
          )}
        </Alert>
      );

    return error;
  };

  const renderDisplayTitle = () => {
    if (updateOption)
      return updateOption.isCancel
        ? strings('edit_gas_fee_eip1559.cancel_transaction')
        : strings('edit_gas_fee_eip1559.speed_up_transaction');
    return strings('edit_gas_fee_eip1559.edit_priority');
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.wrapper}>
        <TouchableWithoutFeedback>
          <View>
            <View>
              <View style={styles.customGasHeader}>
                <TouchableOpacity onPress={onCancel}>
                  <Icon
                    name={'arrow-back'}
                    size={24}
                    color={colors.text.default}
                  />
                </TouchableOpacity>
                <Text bold black>
                  {renderDisplayTitle}
                </Text>
                <Icon
                  name={'arrow-back'}
                  size={24}
                  color={colors.background.default}
                />
              </View>
              {updateOption && (
                <View style={styles.newGasFeeHeader}>
                  <Text black bold noMargin>
                    {strings('edit_gas_fee_eip1559.new_gas_fee')}{' '}
                  </Text>

                  <TouchableOpacity
                    hitSlop={styles.hitSlop}
                    onPress={() => setShowInfoModal('new_gas_fee')}
                  >
                    <MaterialCommunityIcon
                      name="information"
                      size={14}
                      style={styles.labelInfo}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {renderWarning}
            {renderError}
            <FadeAnimationView
              style={styles.headerContainer}
              valueToWatch={valueToWatch}
              animateOnChange={animateOnChange}
            >
              <View style={styles.headerTitle}>
                <Text
                  black
                  style={styles.headerText}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  noMargin
                >
                  ~{gasFeePrimary}
                </Text>
              </View>
              <Text big black style={styles.subheader} noMargin>
                <Text bold black noMargin>
                  {strings('edit_gas_fee_eip1559.max_fee')}:{' '}
                </Text>
                {gasFeeMaxPrimary} ({gasFeeMaxSecondary})
              </Text>
              <View style={styles.labelTextContainer}>
                <Text
                  green={
                    timeEstimateColor === 'green' ||
                    timeEstimateId === AppConstants.GAS_TIMES.VERY_LIKELY
                  }
                  red={timeEstimateColor === 'red'}
                  bold
                >
                  {timeEstimate}
                </Text>
                {(timeEstimateId === AppConstants.GAS_TIMES.MAYBE ||
                  timeEstimateId === AppConstants.GAS_TIMES.UNKNOWN) && (
                  <TouchableOpacity
                    hitSlop={styles.hitSlop}
                    onPress={showTimeEstimateInfoModal}
                  >
                    <MaterialCommunityIcon
                      name="information"
                      size={14}
                      style={styles.redInfo}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </FadeAnimationView>
            {!showInputs ? (
              <View style={styles.dappEditGasContainer}>
                <StyledButton
                  type={'orange'}
                  onPress={() => setShowInputs(true)}
                >
                  {strings('edit_gas_fee_eip1559.edit_suggested_gas_fee')}
                </StyledButton>
              </View>
            ) : (
              renderInputs()
            )}
            <InfoModal
              isVisible={Boolean(showInfoModal)}
              title={
                showInfoModal === 'gas_limit'
                  ? strings('edit_gas_fee_eip1559.gas_limit')
                  : showInfoModal === 'max_priority_fee'
                  ? strings('edit_gas_fee_eip1559.max_priority_fee')
                  : showInfoModal === 'max_fee'
                  ? strings('edit_gas_fee_eip1559.max_fee')
                  : showInfoModal === 'new_gas_fee'
                  ? strings('edit_gas_fee_eip1559.new_gas_fee')
                  : null
              }
              toggleModal={() => setShowInfoModal(null)}
              body={
                <View>
                  <Text grey infoModal>
                    {showInfoModal === 'gas_limit' &&
                      strings('edit_gas_fee_eip1559.learn_more_gas_limit')}
                    {showInfoModal === 'max_priority_fee' &&
                      strings(
                        'edit_gas_fee_eip1559.learn_more_max_priority_fee',
                      )}
                    {showInfoModal === 'max_fee' &&
                      strings('edit_gas_fee_eip1559.learn_more_max_fee')}
                    {showInfoModal === 'new_gas_fee' &&
                    updateOption &&
                    updateOption.isCancel
                      ? strings(
                          'edit_gas_fee_eip1559.learn_more_cancel_gas_fee',
                        )
                      : strings('edit_gas_fee_eip1559.learn_more_new_gas_fee')}
                  </Text>
                </View>
              }
            />
            <InfoModal
              isVisible={showLearnMoreModal}
              title={strings('edit_gas_fee_eip1559.learn_more.title')}
              toggleModal={toggleLearnMoreModal}
              propagateSwipe
              body={
                <View style={styles.learnMoreModal}>
                  <ScrollView>
                    <TouchableWithoutFeedback>
                      <View>
                        <Text noMargin grey infoModal>
                          {strings('edit_gas_fee_eip1559.learn_more.intro')}
                        </Text>
                        <Text
                          noMargin
                          primary
                          infoModal
                          bold
                          style={styles.learnMoreLabels}
                        >
                          {strings('edit_gas_fee_eip1559.learn_more.low_label')}
                        </Text>
                        <Text noMargin grey infoModal>
                          {strings('edit_gas_fee_eip1559.learn_more.low_text')}
                        </Text>
                        <Text
                          noMargin
                          primary
                          infoModal
                          bold
                          style={styles.learnMoreLabels}
                        >
                          {strings(
                            'edit_gas_fee_eip1559.learn_more.market_label',
                          )}
                        </Text>
                        <Text noMargin grey infoModal>
                          {strings(
                            'edit_gas_fee_eip1559.learn_more.market_text',
                          )}
                        </Text>
                        <Text
                          noMargin
                          primary
                          infoModal
                          bold
                          style={styles.learnMoreLabels}
                        >
                          {strings(
                            'edit_gas_fee_eip1559.learn_more.aggressive_label',
                          )}
                        </Text>
                        <Text noMargin grey infoModal>
                          {strings(
                            'edit_gas_fee_eip1559.learn_more.aggressive_text',
                          )}
                        </Text>
                        {/* TODO(eip1559) add link when available
                        <TouchableOpacity style={styles.learnMoreLink}>
                          <Text grey infoModal link>
                            {strings('edit_gas_fee_eip1559.learn_more.link')}
                          </Text>
                        </TouchableOpacity>*/}
                      </View>
                    </TouchableWithoutFeedback>
                  </ScrollView>
                </View>
              }
            />
            <TimeEstimateInfoModal
              isVisible={isVisibleTimeEstimateInfoModal}
              timeEstimateId={timeEstimateId}
              onHideModal={hideTimeEstimateInfoModal}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

EditGasFee1559.defaultProps = {
  ignoreOptions: [],
  warningMinimumEstimateOption: AppConstants.GAS_OPTIONS.LOW,
  suggestedEstimateOption: AppConstants.GAS_OPTIONS.MEDIUM,
};

EditGasFee1559.propTypes = {
  /**
   * Gas option selected (low, medium, high)
   */
  selected: PropTypes.string,
  /**
   * Gas fee currently active
   */
  gasFee: PropTypes.object,
  /**
   * Gas fee options to select from
   */
  gasOptions: PropTypes.object,
  /**
   * Function called when user selected or changed the gas
   */
  onChange: PropTypes.func,
  /**
   * Function called when user cancels
   */
  onCancel: PropTypes.func,
  /**
   * Function called when user saves the new gas
   */
  onSave: PropTypes.func,
  /**
   * Gas fee in native currency
   */
  gasFeeNative: PropTypes.string,
  /**
   * Gas fee converted to chosen currency
   */
  gasFeeConversion: PropTypes.string,
  /**
   * Maximum gas fee in native currency
   */
  gasFeeMaxNative: PropTypes.string,
  /**
   * Maximum gas fee converted to chosen currency
   */
  gasFeeMaxConversion: PropTypes.string,
  /**
   * Maximum priority gas fee in native currency
   */
  maxPriorityFeeNative: PropTypes.string,
  /**
   * Maximum priority gas fee converted to chosen currency
   */
  maxPriorityFeeConversion: PropTypes.string,
  /**
   * Maximum fee per gas fee in native currency
   */
  maxFeePerGasNative: PropTypes.string,
  /**
   * Maximum fee per gas fee converted to chosen currency
   */
  maxFeePerGasConversion: PropTypes.string,
  /**
   * Primary currency, either ETH or Fiat
   */
  primaryCurrency: PropTypes.string,
  /**
   * A string representing the network chainId
   */
  chainId: PropTypes.string,
  /**
   * String that represents the time estimates
   */
  timeEstimate: PropTypes.string,
  /**
   * String that represents the color of the time estimate
   */
  timeEstimateColor: PropTypes.string,
  /**
   * Time estimate name (unknown, low, medium, high, less_than, range)
   */
  timeEstimateId: PropTypes.string,
  /**
   * Error message to show
   */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.node,
  ]),
  /**
   * Warning message to show
   */
  warning: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.node,
  ]),
  /**
   * Boolean that specifies if the gas price was suggested by the dapp
   */
  dappSuggestedGas: PropTypes.bool,
  /**
   * Ignore option array
   */
  ignoreOptions: PropTypes.array,
  /**
   * Option to display speed up/cancel view
   */
  updateOption: PropTypes.object,
  /**
   * Extend options object. Object has option keys and properties will be spread
   */
  extendOptions: PropTypes.object,
  /**
   * Recommended object with type and render function
   */
  recommended: PropTypes.object,
  /**
   * Estimate option to compare with for too low warning
   */
  warningMinimumEstimateOption: PropTypes.string,
  /**
   * Suggested estimate option to show recommended values
   */
  suggestedEstimateOption: PropTypes.string,
  /**
   * Function to call when update animation starts
   */
  onUpdatingValuesStart: PropTypes.func,
  /**
   * Function to call when update animation ends
   */
  onUpdatingValuesEnd: PropTypes.func,
  /**
   * If the values should animate upon update or not
   */
  animateOnChange: PropTypes.bool,
  /**
   * Boolean to determine if the animation is happening
   */
  isAnimating: PropTypes.bool,
  /**
   * Extra analytics params to be send with the gas analytics
   */
  analyticsParams: PropTypes.object,
  /**
   * (For analytics purposes) View (Approve, Transfer, Confirm) where this component is being used
   */
  view: PropTypes.string.isRequired,
};

export default EditGasFee1559;
