import { merge } from 'lodash';

/**
 * Mock fee market estimates for gas fee calculations in confirmations
 * Provides low, medium, and high gas fee estimates with timing predictions
 * Used for testing gas fee controller functionality in confirmation flows
 */
export const feeMarketEstimates = {
  low: {
    suggestedMaxPriorityFeePerGas: '0',
    suggestedMaxFeePerGas: '0.01',
    minWaitTimeEstimate: 30000,
    maxWaitTimeEstimate: 60000,
  },
  medium: {
    suggestedMaxPriorityFeePerGas: '0',
    suggestedMaxFeePerGas: '0.0135',
    minWaitTimeEstimate: 20000,
    maxWaitTimeEstimate: 40000,
  },
  high: {
    suggestedMaxPriorityFeePerGas: '0',
    suggestedMaxFeePerGas: '0.017',
    minWaitTimeEstimate: 10000,
    maxWaitTimeEstimate: 15000,
  },
  estimatedBaseFee: '0.01',
  historicalBaseFeeRange: ['0.01', '0.01'],
  baseFeeTrend: 'down',
  latestPriorityFeeRange: ['0.005', '0.01'],
  historicalPriorityFeeRange: ['0.005', '0.01'],
  priorityFeeTrend: 'up',
  networkCongestion: 0,
};

const baseGasFeeControllerMock = {
  engine: {
    backgroundState: {
      GasFeeController: {
        gasFeeEstimates: {},
      },
    },
  },
};

/**
 * Mock gas fee controller state for testing confirmation components
 * Merges base controller state with fee estimates for Ethereum mainnet
 * Used to simulate gas fee controller behavior in confirmation view tests
 */
export const gasFeeControllerMock = merge({}, baseGasFeeControllerMock, {
  engine: {
    backgroundState: {
      GasFeeController: {
        gasFeeEstimatesByChainId: {
          '0x1': feeMarketEstimates,
        },
      },
    },
  },
});
