const ASDToken = artifacts.require('ASDToken');

let chai = require('chai');
const BN = web3.utils.BN;
console.log(BN);

const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;
let instance;
let totalSupply;
 
contract("Test UpStateToken", async (accounts) => {
  beforeEach(async () => {
    instance = await ASDToken.deployed();
    totalSupply = await instance.totalSupply();
  });
 
  it("Initial Supply assigned to the owner account", async () => {
    expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(
      totalSupply
    );
  });
 
  it("Transfer tokens", async () => {
    await instance.transfer(accounts[1], 100);
    expect(instance.balanceOf(accounts[1])).to.eventually.be.a.bignumber.equal(
      new BN(100)
    );
  });
 
  it("Should not be able to spend more than available balance", async () => {
    let availableBal = await instance.balanceOf(accounts[0]);
    try {
      await instance.transfer(accounts[1], availableBal);
    } catch (err) {
      assert(err);
    }
  });
})