const ASDTokenCrowdsale = artifacts.require('ASDTokenCrowdsale');
const ASDToken = artifacts.require('ASDToken');
const KycContract = artifacts.require('KycContract');
const chai = require('./setupchai.js');
const BN = web3.utils.BN;
const expect = chai.expect;


require('dotenv').config({path: "../.env"});

 
contract("Test UpStateTokenCrowdsale", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts

    it('Should not have any tokens in my deployerAccount', async() => {
        let instance = await ASDToken.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

    it('All tokens should be in the ASDTokenCrowdsale Smart contract by default', async () => {
        let instance = await ASDToken.deployed();
        let balanceOfASDTokenCrowdsaleSmartContract = await instance.balanceOf(ASDTokenCrowdsale.address);
        let totalSupply = await instance.totalSupply();
        expect(balanceOfASDTokenCrowdsaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    })

    it("Should be possible to by tokens", async () => {
        let ASDTokenInstance = await ASDToken.deployed();
        let ASDTokenCrowdsaleInstance = await ASDTokenCrowdsale.deployed();
        let KycContractInstance = await KycContract.deployed();
        let balanceBefore = await ASDTokenInstance.balanceOf(deployerAccount);
        await KycContractInstance.setKycCompleted(deployerAccount, {from: deployerAccount});
        expect(ASDTokenCrowdsaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        balanceBefore = balanceBefore.add(new BN(1));
        return expect(ASDTokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore);
      });
})