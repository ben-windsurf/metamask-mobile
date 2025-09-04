import {
  SMART_CONTRACTS,
  contractConfiguration,
} from '../../app/util/test/smart-contracts';
import ContractAddressRegistry from '../../app/util/test/contract-address-registry';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/**
 * Options for deploying a smart contract
 * @interface DeployOptions
 * @property abi - The contract's ABI (Application Binary Interface)
 * @property account - The account address to deploy from
 * @property args - Constructor arguments for the contract
 * @property bytecode - The contract's compiled bytecode
 * @property gasPrice - Optional gas price for legacy transactions
 */
interface DeployOptions {
  abi: any;
  account: string;
  args: any[];
  bytecode: string;
  gasPrice?: number;
}

/**
 * Options for interacting with a deployed smart contract
 * @interface ContractOptions
 * @property address - The deployed contract's address
 * @property abi - The contract's ABI (Application Binary Interface)
 * @property functionName - The name of the contract function to call
 * @property args - Arguments to pass to the contract function
 * @property account - The account address to call from
 * @property gasPrice - Optional gas price for legacy transactions
 */
interface ContractOptions {
  address: string;
  abi: any;
  functionName: string;
  args: any[];
  account: string;
  gasPrice?: number;
}

/**
 * Local network seeder used to deploy smart contracts and set initial blockchain state for e2e tests.
 * This class provides utilities to deploy test contracts, transfer funds, and manage contract addresses
 * in a local Anvil test environment.
 */
export class AnvilSeeder {
  private smartContractRegistry: InstanceType<typeof ContractAddressRegistry>;
  private provider: any;

  /**
   * Creates a new AnvilSeeder instance
   * @param provider - The blockchain provider instance with publicClient, testClient, and walletClient
   */
  constructor(provider: any) {
    this.smartContractRegistry = new ContractAddressRegistry();
    this.provider = provider;
  }

  /**
   * Deploy initial smart contracts that can be used later within the e2e tests.
   * Handles special cases for NFT and ERC1155 contracts by minting initial tokens.
   *
   * @param contractName - The name of the contract to deploy
   * @param hardfork - The Ethereum hardfork to use (affects gas pricing)
   */
  async deploySmartContract(contractName: string, hardfork: string) {
    const { publicClient, testClient, walletClient } = this.provider;
    const fromAddress = (await walletClient.getAddresses())[0];

    const contractConfig = contractConfiguration[contractName];
    const deployArgs = this.getDeployArgs(contractName, contractConfig);

    const deployOptions: DeployOptions = {
      abi: contractConfig.abi,
      account: fromAddress,
      args: deployArgs,
      bytecode: contractConfig.bytecode,
    };

    // Add gasPrice if hardfork is muirGlacier to indicate it's a legacy tx
    if (hardfork === 'muirGlacier') {
      deployOptions.gasPrice = 20000;
    }

    const hash = await walletClient.deployContract(deployOptions);

    await testClient.mine({
      blocks: 1,
    });

    const receipt = await publicClient.getTransactionReceipt({ hash });
    // eslint-disable-next-line no-console
    console.log('Deployed smart contract', {
      contractName,
      contractAddress: receipt.contractAddress,
    });

    if (contractName === SMART_CONTRACTS.NFTS) {
      const mintOptions: ContractOptions = {
        address: receipt.contractAddress,
        abi: contractConfig.abi,
        functionName: 'mintNFTs',
        args: [1],
        account: fromAddress,
      };

      if (hardfork === 'muirGlacier') {
        mintOptions.gasPrice = 20000;
      }

      await walletClient.writeContract(mintOptions);
    }

    if (contractName === SMART_CONTRACTS.ERC1155) {
      const mintBatchOptions: ContractOptions = {
        address: receipt.contractAddress,
        abi: contractConfig.abi,
        functionName: 'mintBatch',
        args: [fromAddress, [1, 2, 3], [1, 1, 100000000000000], '0x'],
        account: fromAddress,
      };

      if (hardfork === 'muirGlacier') {
        mintBatchOptions.gasPrice = 20000;
      }

      await walletClient.writeContract(mintBatchOptions);
    }

    this.storeSmartContractAddress(contractName, receipt.contractAddress);
  }

  /**
   * Transfer ETH from the default account to a specified address
   * @param to - The recipient address
   * @param value - The amount of ETH to transfer (in wei)
   */
  async transfer(to: string, value: string) {
    const { publicClient, walletClient, testClient } = this.provider;
    const fromAddress = (await walletClient.getAddresses())[0];

    const transaction = await walletClient.sendTransaction({
      account: fromAddress,
      value,
      to,
    });
    await testClient.mine({
      blocks: 1,
    });

    await publicClient.getTransactionReceipt({ hash: transaction });
    // eslint-disable-next-line no-console
    console.log('Completed transfer', { to, value });
  }

  /**
   * Store deployed smart contract address within the environment variables
   * to make it available everywhere.
   *
   * @param contractName - The name of the deployed contract
   * @param contractAddress - The deployed contract's address
   */
  storeSmartContractAddress(contractName: string, contractAddress: string) {
    this.smartContractRegistry.storeNewContractAddress(
      contractName,
      contractAddress,
    );
  }

  /**
   * Return an instance of the currently used smart contract registry.
   *
   * @returns ContractAddressRegistry
   */
  getContractRegistry() {
    return this.smartContractRegistry;
  }

  getDeployArgs(contractName: string, contractConfig: any) {
    if (contractName === SMART_CONTRACTS.HST) {
      return [
        contractConfig.initialAmount,
        contractConfig.tokenName,
        contractConfig.decimalUnits,
        contractConfig.tokenSymbol,
      ];
    }
    return [];
  }
}
