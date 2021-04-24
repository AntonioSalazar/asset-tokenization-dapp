import React, { Component } from "react";
import ASDToken from "./contracts/ASDToken.json";
import ASDTokenCrowdsale from './contracts/ASDTokenCrowdsale.json';
import KycContract from './contracts/KycContract.json';
import getWeb3 from "./getWeb3";


class App extends Component {
  state = { loaded: false, kycAddress: '0x123...', ASDTokenAddress:  null, UserTokens: 0};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.ASDTokenInstance = new this.web3.eth.Contract(
        ASDToken.abi,
        ASDToken.networks[this.networkId] && ASDToken.networks[this.networkId].address,
      );

      this.ASDTokenCrowdsaleInstance = new this.web3.eth.Contract(
        ASDTokenCrowdsale.abi,
        ASDTokenCrowdsale.networks[this.networkId] && ASDTokenCrowdsale.networks[this.networkId].address,
      );

      this.KycContractInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      this.setState({loaded: true, ASDTokenAddress: ASDTokenCrowdsale.networks[this.networkId].address}, this.updateUserTokens);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = e => {
    const target = e.target;
    const value = e.target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  };

  handleKycWhitelisting = async () => {
    await this.KycContractInstance.methods.setKycCompleted(this.state.kycAddress).send({from: this.accounts[0]}); 
    alert(`KYC for ${this.state.kycAddress} is completed`);
  }

  updateUserTokens = async () => {
    let UserTokens = await this.ASDTokenInstance.methods.balanceOf(this.accounts[0]).call();
    this.setState({
      UserTokens: UserTokens
    })
  }


  listenToTokenTransfer =  () => {
    this.ASDTokenInstance.events.Transfer({to: this.accounts[0]}).on('data', this.updateUserTokens)
  }

  handleBuyTokens = async () => {
    await this.ASDTokenCrowdsaleInstance.methods.buyTokens(this.accounts[0]).send({from: this.accounts[0], value: this.web3.utils.toWei('1', 'wei')});
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>AntonioSalazarDeveloper ASD Token Sale</h1>
        <p>Get your token!</p>
        <h2>KYC Whitelistening </h2>
        <div className='kyc-btn'>
          <h3> Address to allow: </h3>
          <input type="text" name='kycAddress' value={this.state.kycAddress} onChange={this.handleInputChange}/>
          <button type='button' onClick={this.handleKycWhitelisting}>Whitelist Address</button>
        </div>
        <br/>
        <h2>Buy ASD Tokens</h2>
        <p>If you want to buy tokens, send Wei to this address: {this.state.ASDTokenAddress}</p>
        <br/>
        <p>You currently have: {this.state.UserTokens} ASD Tokens</p>
        <button type='button' onClick={this.handleBuyTokens}>Buy more tokens</button>
      </div>
    );
  }
}

export default App;
