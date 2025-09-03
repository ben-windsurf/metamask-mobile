/**
 * Mock object for SignatureController state used in confirmation view tests
 * Provides empty state structure matching the actual SignatureController format
 * Used to simulate scenarios with no pending signature requests
 */
export const emptySignatureControllerMock = {
  engine: {
    backgroundState: {
      SignatureController: {
        signatureRequests: {},
        unapprovedPersonalMsgs: {},
        unapprovedTypedMessages: {},
        unapprovedPersonalMsgCount: 0,
        unapprovedTypedMessagesCount: 0,
      },
    },
  },
};
