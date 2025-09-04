import { NetworkType, toHex } from '@metamask/controller-utils';

/** Infura project ID from environment variables */
export const INFURA_PROJECT_ID = process.env.MM_INFURA_PROJECT_ID;

/** Ethereum mainnet network identifier */
export const MAINNET = 'mainnet';
/** Ethereum homestead network identifier (alias for mainnet) */
export const HOMESTEAD = 'homestead';
/** Goerli testnet network identifier */
export const GOERLI = 'goerli';
/** Sepolia testnet network identifier */
export const SEPOLIA = 'sepolia';
/** Linea Goerli testnet network identifier */
export const LINEA_GOERLI = 'linea-goerli';
/** Linea Sepolia testnet network identifier */
export const LINEA_SEPOLIA = 'linea-sepolia';
/** Linea mainnet network identifier */
export const LINEA_MAINNET = 'linea-mainnet';
/** Base mainnet network identifier */
export const BASE_MAINNET = 'base-mainnet';
/** MegaETH testnet network identifier */
export const MEGAETH_TESTNET = 'megaeth-testnet';
/** Monad testnet network identifier */
export const MONAD_TESTNET = 'monad-testnet';
/** Bitcoin testnet network identifier */
export const BITCOIN_TESTNET = 'bitcoin-testnet';
/** Bitcoin Mutinynet network identifier */
export const BITCOIN_MUTINYNET = 'bitcoin-mutinynet';

/** RPC network type constant */
export const RPC = NetworkType.rpc;
/** Constant indicating no block explorer is available */
export const NO_RPC_BLOCK_EXPLORER = 'NO_BLOCK_EXPLORER';
/** Private network identifier */
export const PRIVATENETWORK = 'PRIVATENETWORK';
/** Default custom name for Ethereum mainnet */
export const DEFAULT_MAINNET_CUSTOM_NAME = 'Ethereum Main Custom';
/** Default IPFS gateway URL for content resolution */
export const IPFS_DEFAULT_GATEWAY_URL = 'https://dweb.link/ipfs/';

/**
 * @enum {string}
 */
export const NETWORKS_CHAIN_ID = {
  MAINNET: toHex('1'),
  OPTIMISM: toHex('10'),
  BSC: toHex('56'),
  POLYGON: toHex('137'),
  FANTOM: toHex('250'),
  BASE: toHex('8453'),
  ARBITRUM: toHex('42161'),
  AVAXCCHAIN: toHex('43114'),
  CELO: toHex('42220'),
  HARMONY: toHex('1666600000'),
  SEPOLIA: toHex('11155111'),
  LINEA_GOERLI: toHex('59140'),
  LINEA_SEPOLIA: toHex('59141'),
  GOERLI: toHex('5'),
  LINEA_MAINNET: toHex('59144'),
  ZKSYNC_ERA: toHex('324'),
  LOCALHOST: toHex('1337'),
  ARBITRUM_GOERLI: toHex('421613'),
  OPTIMISM_GOERLI: toHex('420'),
  MUMBAI: toHex('80001'),
  OPBNB: toHex('204'),
  SCROLL: toHex('534352'),
  BERACHAIN: toHex('80094'),
  METACHAIN_ONE: toHex('112358'),
  MEGAETH_TESTNET: toHex('6342'),
  SEI: toHex('1329'),
  MONAD_TESTNET: toHex('10143'),
};

/**
 * Array of deprecated network chain IDs that should show deprecation warnings.
 * To add a deprecation warning to a network, add its chain ID to this array.
 */
export const DEPRECATED_NETWORKS = [
  NETWORKS_CHAIN_ID.GOERLI,
  NETWORKS_CHAIN_ID.ARBITRUM_GOERLI,
  NETWORKS_CHAIN_ID.OPTIMISM_GOERLI,
  NETWORKS_CHAIN_ID.LINEA_GOERLI,
  NETWORKS_CHAIN_ID.MUMBAI,
];
export const CHAINLIST_CURRENCY_SYMBOLS_MAP = {
  MAINNET: 'ETH',
  OPTIMISM: 'ETH',
  BNB: 'BNB',
  MATIC: 'MATIC',
  POL: 'POL',
  FANTOM_OPERA: 'FTM',
  BASE: 'ETH',
  ARBITRUM: 'ETH',
  AVALANCHE: 'AVAX',
  CELO: 'CELO',
  HARMONY: 'ONE',
  SEPOLIA: 'SepoliaETH',
  LINEA_GOERLI: 'LineaETH',
  LINEA_SEPOLIA: 'LineaETH',
  GOERLI: 'GoerliETH',
  LINEA_MAINNET: 'ETH',
  ZKSYNC_ERA: 'ETH',
  MEGAETH_TESTNET: 'MegaETH',
  SEI: 'SEI',
  MONAD_TESTNET: 'MON',
};

export const CURRENCY_SYMBOL_BY_CHAIN_ID = {
  [NETWORKS_CHAIN_ID.MAINNET]: CHAINLIST_CURRENCY_SYMBOLS_MAP.MAINNET,
  [NETWORKS_CHAIN_ID.OPTIMISM]: CHAINLIST_CURRENCY_SYMBOLS_MAP.OPTIMISM,
  [NETWORKS_CHAIN_ID.BSC]: CHAINLIST_CURRENCY_SYMBOLS_MAP.BNB,
  [NETWORKS_CHAIN_ID.POLYGON]: CHAINLIST_CURRENCY_SYMBOLS_MAP.POL,
  [NETWORKS_CHAIN_ID.FANTOM]: CHAINLIST_CURRENCY_SYMBOLS_MAP.FANTOM_OPERA,
  [NETWORKS_CHAIN_ID.BASE]: CHAINLIST_CURRENCY_SYMBOLS_MAP.BASE,
  [NETWORKS_CHAIN_ID.ARBITRUM]: CHAINLIST_CURRENCY_SYMBOLS_MAP.ARBITRUM,
  [NETWORKS_CHAIN_ID.AVAXCCHAIN]: CHAINLIST_CURRENCY_SYMBOLS_MAP.AVALANCHE,
  [NETWORKS_CHAIN_ID.CELO]: CHAINLIST_CURRENCY_SYMBOLS_MAP.CELO,
  [NETWORKS_CHAIN_ID.HARMONY]: CHAINLIST_CURRENCY_SYMBOLS_MAP.HARMONY,
  [NETWORKS_CHAIN_ID.SEPOLIA]: CHAINLIST_CURRENCY_SYMBOLS_MAP.SEPOLIA,
  [NETWORKS_CHAIN_ID.LINEA_GOERLI]: CHAINLIST_CURRENCY_SYMBOLS_MAP.LINEA_GOERLI,
  [NETWORKS_CHAIN_ID.LINEA_SEPOLIA]:
    CHAINLIST_CURRENCY_SYMBOLS_MAP.LINEA_SEPOLIA,
  [NETWORKS_CHAIN_ID.GOERLI]: CHAINLIST_CURRENCY_SYMBOLS_MAP.GOERLI,
  [NETWORKS_CHAIN_ID.LINEA_MAINNET]:
    CHAINLIST_CURRENCY_SYMBOLS_MAP.LINEA_MAINNET,
  [NETWORKS_CHAIN_ID.ZKSYNC_ERA]: CHAINLIST_CURRENCY_SYMBOLS_MAP.ZKSYNC_ERA,
  [NETWORKS_CHAIN_ID.MEGAETH_TESTNET]:
    CHAINLIST_CURRENCY_SYMBOLS_MAP.MEGAETH_TESTNET,
  [NETWORKS_CHAIN_ID.SEI]: CHAINLIST_CURRENCY_SYMBOLS_MAP.SEI,
  [NETWORKS_CHAIN_ID.MONAD_TESTNET]:
    CHAINLIST_CURRENCY_SYMBOLS_MAP.MONAD_TESTNET,
};

export const TEST_NETWORK_IDS = [
  NETWORKS_CHAIN_ID.GOERLI,
  NETWORKS_CHAIN_ID.SEPOLIA,
  NETWORKS_CHAIN_ID.LINEA_GOERLI,
  NETWORKS_CHAIN_ID.LINEA_SEPOLIA,
  NETWORKS_CHAIN_ID.MEGAETH_TESTNET,
  NETWORKS_CHAIN_ID.MONAD_TESTNET,
];
