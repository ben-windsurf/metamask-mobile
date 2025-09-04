// Only keep selectors that are actually used in tests

/**
 * Web element IDs for TestSnap view components used in end-to-end testing.
 * Contains selectors for various BIP32/BIP44 operations, network access, and signing functions.
 */
export const TestSnapViewSelectorWebIDS = {
  connectBip32Button: 'connectbip32',
  connectBip44Button: 'connectbip44',
  connectNetworkAccessButton: 'connectnetwork-access',
  connectEthereumProviderButton: 'connectethereum-provider',
  getPublicKeyBip44Button: 'sendBip44Test',
  signMessageBip44Button: 'signBip44Message',
  getPublicKeyBip32Button: 'bip32GetPublic',
  getCompressedPublicKeyBip32Button: 'bip32GetCompressedPublic',
  signMessageBip32Secp256k1Button: 'sendBip32-secp256k1',
  signMessageBip32ed25519Button: 'sendBip32-ed25519',
  signMessageBip32ed25519Bip32Button: 'sendBip32-ed25519Bip32',
  sendNetworkAccessTestButton: 'sendNetworkAccessTest',
  startWebSocket: 'startWebSocket',
  stopWebSocket: 'stopWebSocket',
  getWebSocketState: 'getWebSocketState',
  getChainIdButton: 'sendEthprovider',
  getAccountsButton: 'sendEthproviderAccounts',
  personalSignButton: 'signPersonalSignMessage',
  signTypedDataButton: 'signTypedDataButton',
};

/**
 * Web element IDs for TestSnap input fields used in end-to-end testing.
 * Contains selectors for message inputs across different cryptographic operations.
 */
export const TestSnapInputSelectorWebIDS = {
  messageBip44Input: 'bip44Message',
  messageEd25519Bip32Input: 'bip32Message-ed25519Bip32',
  messageEd25519Input: 'bip32Message-ed25519',
  messageSecp256k1Input: 'bip32Message-secp256k1',
  webSocketUrlInput: 'webSocketUrl',
  personalSignMessageInput: 'personalSignMessage',
  signTypedDataMessageInput: 'signTypedData',
};

/**
 * Web element IDs for entropy dropdown selectors used in TestSnap end-to-end testing.
 * Contains selectors for BIP32/BIP44 entropy selection and network dropdown components.
 */
export const EntropyDropDownSelectorWebIDS = {
  bip32EntropyDropDown: 'bip32-entropy-selector',
  bip44EntropyDropDown: 'bip44-entropy-selector',
  networkDropDown: 'select-chain',
};

/**
 * Web element IDs for TestSnap result display elements used in end-to-end testing.
 * Contains selectors for result spans that display outcomes of various cryptographic operations.
 */
export const TestSnapResultSelectorWebIDS = {
  bip44ResultSpan: 'bip44Result',
  bip44SignResultSpan: 'bip44SignResult',
  bip32MessageResultEd25519Span: 'bip32MessageResult-ed25519',
  bip32MessageResultSecp256k1Span: 'bip32MessageResult-secp256k1',
  bip32MessageResultEd25519Bip32Span: 'bip32MessageResult-ed25519Bip32',
  bip32PublicKeyResultSpan: 'bip32PublicKeyResult',
  networkAccessResultSpan: 'networkAccessResult',
  ethereumProviderResultSpan: 'ethproviderResult',
  personalSignResultSpan: 'personalSignResult',
  signTypedDataResultSpan: 'signTypedDataResult',
};

/**
 * Web element IDs for TestSnap bottom sheet components used in end-to-end testing.
 * Contains selectors for bottom sheet footer buttons and related UI elements.
 */
export const TestSnapBottomSheetSelectorWebIDS = {
  BOTTOMSHEET_FOOTER_BUTTON_ID: 'bottomsheetfooter-button-subsequent',
};
