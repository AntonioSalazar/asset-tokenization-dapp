const ASDTokenCrowdsale = artifacts.require('ASDTokenCrowdsale');
const ASDToken = artifacts.require('ASDToken');
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
})