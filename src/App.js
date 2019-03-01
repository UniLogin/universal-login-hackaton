import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import UniversalLoginSDK from "universal-login-sdk";
import ethers from "ethers";

class App extends Component {
  constructor(props) {
    super(props);

    this.privateKey = "n/a";
    this.contractAddress = "n/a";

    this.sdk = new UniversalLoginSDK(
      "https://relayer.universallogin.io", // local relayer URL: 'http://localhost:3311'
      "https://rinkeby.infura.io" // local json Rpc Url: 'http://localhost:18545'
    );
  }

  async componentDidMount() {
    [this.props.privateKey, this.props.contractAddress] = await this.sdk.create(
      "foobar.mylogin.eth"
    );
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

    await this.props.sdk.execute(message, this.props.privateKey);
  }

  render() {
    return (
      <div className="App">
        <h1> This is your app </h1>
        Your device private key: {this.privateKey} <br />
        Your contract address: {this.contractAddress} <br /> <br />
        <button onClick={this.transfer}> Transfer </button>
      </div>
    );
  }
}

export default App;
