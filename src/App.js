import React, { Component } from "react";
import "./App.css";
import UniversalLoginSDK from "universal-login-sdk";
// import ethers from "ethers";
// const {Contract} = require('ethers')
// const {Token} = require('universal-login-ops')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {privateKey: "", contractAddress: "", balance: 0};
    this.sdk = new UniversalLoginSDK('http://localhost:3311', 'http://localhost:18545');
    // this.tokenContract = new Contract('0x0E2365e86A50377c567E1a62CA473656f0029F1e', Token.interface, this.sdk.provider)
  }

  async register(event) {
    // Registers an ENS name and deploys a contract
    event.preventDefault()
    console.log(event.target.username.value + '.mylogin.eth')
    const username = event.target.username.value + '.mylogin.eth';
    const [privateKey, contractAddress] = await this.sdk.create(username);

    const getBalance = await this.sdk.provider.getBalance(contractAddress)
    const balance = (getBalance/(Math.pow(10,18))).toString();
    this.setState({privateKey, contractAddress, balance});

  }  

  async execute(event) {
    // Executes a transaction
    event.preventDefault()

    const message = {
      from: this.state.contractAddress,
      to: event.target.recipient.value,
      data: "0x0",
      value: "100000000000000000",
      gasToken: "0x0E2365e86A50377c567E1a62CA473656f0029F1e", // get this address from your terminal
      gasPrice: 1000000000,
      gasLimit: 1000000
    };

    await this.sdk.execute(message, this.state.privateKey);

    const getBalance = await this.sdk.provider.getBalance(this.state.contractAddress)
    const balance = (getBalance/(Math.pow(10,18))).toString();
    this.setState({balance});

  }

  render() {
    return (
      <div className="App">
        <h1> This is your app </h1>
        {this.state.contractAddress.length == 0 ? (
            <form onSubmit={this.register.bind(this)}>
            <input type="text" name="username" placeholder="your username"/>.mylogin.eth 
              <button type="submit"> register </button> <br/>
            </form>
          ) : (
            <form onSubmit={this.execute.bind(this)}>
              Your device private key: {this.state.privateKey} <br /><br />
              Your contract address: {this.state.contractAddress} <br /> <br />
              Your balance: {this.state.balance} <br /> <br />
            <input type="text" name="recipient" value="0x1234567890000000000000000000000000000000"/>
              <button type="submit"> Transfer 0.1 ether </button> <br/>
            </form>
          )}      
      </div>
    );
  }
}

export default App;
