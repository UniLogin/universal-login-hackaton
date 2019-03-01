import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import UniversalLoginSDK from "universal-login-sdk";
import ethers from "ethers";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {privateKey: "n/a", contractAddress: "n/a"};
    this.sdk = new UniversalLoginSDK('http://localhost:3311', 'http://localhost:18545');
  }

  async componentDidMount() {
    const [privateKey, contractAddress] = await this.sdk.create('sddds.mylogin.eth');
    this.setState({privateKey, contractAddress});
  }

  async transfer() {
    const message = {
      from: "0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA",
      to: "0xbA03ea3517ddcD75e38a65EDEB4dD4ae17D52A1A",
      data: "0x0",
      value: "500000000000000000",
      gasToken: "0x9f2990f93694B496F5EAc5822a45f9c642aaDB73",
      gasPrice: 1000000000,
      gasLimit: 1000000
    };
    await this.sdk.execute(message, this.props.privateKey);
  }

  render() {
    return (
      <div className="App">
        <h1> This is your app </h1>
        Your device private key: {this.state.privateKey} <br />
        Your contract address: {this.state.contractAddress} <br /> <br />
        <button onClick={this.transfer}> Transfer </button>
      </div>
    );
  }
}

export default App;
