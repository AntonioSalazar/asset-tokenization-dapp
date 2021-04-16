var ASDToken = artifacts.require("./ASDToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ASDToken, 10000);
};
