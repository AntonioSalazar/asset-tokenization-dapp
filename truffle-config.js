const path = require("path");
require('dotenv').config({path: "./.env"});
const HDWalletProvider = require('@truffle/hdwallet-provider');
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, 'Http://127.0.0.1:7545', AccountIndex)
      },
      network_id: 5777
    }
  },

  compilers: {
    solc: {
      version: "0.6.1",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
