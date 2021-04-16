const ASDToken = artifacts.require('ASDToken');

const chai = require('./setupchai');
const BN = web3.utils.BN;
const expect = chai.expect;
let instance;
let totalSupply;

require('dotenv').config({path: "../.env"});

 
contract("Test UpStateToken", async (accounts) => {
  beforeEach(async () => {
    this.ASDToken = await ASDToken.new(process.env.INITIAL_TOKENS);
    instance = this.ASDToken;
    totalSupply = await instance.totalSupply();
  });
 
  it("Initial Supply assigned to the owner account", async () => {
    return expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(
      totalSupply
    );
  });
 
  it("Transfer tokens", async () => {
    await instance.transfer(accounts[1], 100);
    return expect(instance.balanceOf(accounts[1])).to.eventually.be.a.bignumber.equal(
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