import React from 'react';
import PropTypes from 'prop-types';
import { ChainId } from '@metamask/controller-utils';
import { connect } from 'react-redux';
import TokenIcon from '../Swaps/components/TokenIcon';
import {
  selectChainId,
  selectEvmTicker,
} from '../../../selectors/networkController';

/**
 * NetworkMainAssetLogo displays the appropriate token icon for the current network's main asset
 * Shows ETH icon for mainnet, otherwise shows the network's native token icon
 * @param {Object} props - Component props
 * @param {string} props.chainId - The current chain ID
 * @param {string} props.ticker - The network's ticker symbol
 * @param {Object} props.style - Custom styles to apply to the icon
 * @param {boolean} props.big - Whether to render a big version of the icon
 * @param {boolean} props.biggest - Whether to render the biggest version of the icon
 * @param {string} props.testID - Test identifier for the component
 * @returns {JSX.Element} TokenIcon component with appropriate symbol
 */
function NetworkMainAssetLogo({
  chainId,
  ticker,
  style,
  big,
  biggest,
  testID,
}) {
  if (chainId === ChainId.mainnet) {
    return (
      <TokenIcon
        big={big}
        biggest={biggest}
        symbol={'ETH'}
        style={style}
        testID={testID}
      />
    );
  }
  return (
    <TokenIcon
      big={big}
      biggest={biggest}
      symbol={ticker}
      style={style}
      testID={testID}
    />
  );
}

/**
 * Maps Redux state to component props
 * @param {Object} state - Redux state
 * @returns {Object} Props object with chainId and ticker
 */
const mapStateToProps = (state) => ({
  chainId: selectChainId(state),
  ticker: selectEvmTicker(state),
});

NetworkMainAssetLogo.propTypes = {
  chainId: PropTypes.string,
  ticker: PropTypes.string,
  style: PropTypes.object,
  big: PropTypes.bool,
  biggest: PropTypes.bool,
  testID: PropTypes.string,
};

export default connect(mapStateToProps)(NetworkMainAssetLogo);
