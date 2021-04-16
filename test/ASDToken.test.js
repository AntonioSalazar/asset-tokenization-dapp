const ASDToken = artifacts.require('ASDToken');

let chai = require('chai');
const BN = web3.utils.BN;
console.log(BN);

const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

contract('Token tests', async accounts => {

    const [deployerAccount, recipiect , thirdAccount ] = accounts;

    it('All tokens should be in owner account', async () => {
        let instance = await ASDToken.deployed();
        let totalSupply = await instance.totalSupply();
        expect( instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    })


});
