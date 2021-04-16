var ASDToken = artifacts.require("./ASDToken.sol");
var ASDTokenCrowdsale = artifacts.require("./ASDTokenCrowdsale");
var KycContract = artifacts.require('./KycContract');
require('dotenv').config({path: "../.env"});

module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(ASDToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(KycContract);
  await deployer.deploy(ASDTokenCrowdsale, 1, addr[0], ASDToken.address, KycContract.address);
  let instance = await ASDToken.deployed();
  await instance.transfer(ASDTokenCrowdsale.address, process.env.INITIAL_TOKENS);
};
