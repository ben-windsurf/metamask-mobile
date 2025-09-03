/**
 * Needed after https://github.com/MetaMask/controllers/pull/152
 * Migrates AddressBookController structure to organize addresses by chainId
 * @param {unknown} state - The Redux state to migrate
 * @returns {unknown} The migrated state with restructured address book
 **/
export default function migrate(state) {
  const addressBook =
    state.engine.backgroundState.AddressBookController.addressBook;
  const migratedAddressBook = {};
  Object.keys(addressBook).forEach((address) => {
    const chainId = addressBook[address].chainId.toString();
    migratedAddressBook[chainId]
      ? (migratedAddressBook[chainId] = {
          ...migratedAddressBook[chainId],
          [address]: addressBook[address],
        })
      : (migratedAddressBook[chainId] = { [address]: addressBook[address] });
  });
  state.engine.backgroundState.AddressBookController.addressBook =
    migratedAddressBook;
  return state;
}
