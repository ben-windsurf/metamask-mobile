export interface CustomGasConfig {
  AVERAGE_GAS: number;
  LOW_GAS: number;
  FAST_GAS: number;
  DEFAULT_GAS_LIMIT: string;
}

export enum AssetType {
  ETH = 'ETH',
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export interface TransactionTypes {
  CUSTOM_GAS: CustomGasConfig;
  ASSET: typeof AssetType;
  MMM: string;
  MM: string;
}

const transactionTypes: TransactionTypes = {
  CUSTOM_GAS: {
    AVERAGE_GAS: 20,
    LOW_GAS: 10,
    FAST_GAS: 40,
    DEFAULT_GAS_LIMIT: '0x5208',
  },
  ASSET: AssetType,
  MMM: 'MetaMask Mobile',
  MM: 'metamask',
};

export default transactionTypes;
