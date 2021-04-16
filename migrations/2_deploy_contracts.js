var ASDToken = artifacts.require("./ASDToken.sol");
var ASDTokenCrowdsale = artifacts.require("./ASDTokenCrowdsale");
module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(ASDToken, 1000000);
  await deployer.deploy(ASDTokenCrowdsale, 1, addr[0], ASDToken.address);
  let instance = await ASDToken.deployed();
  await instance.transfer(ASDTokenCrowdsale.address, 1000000);
};
