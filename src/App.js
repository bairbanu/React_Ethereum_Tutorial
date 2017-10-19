import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      secret: null,
      processedData: null,
      contractState: '',
      contractProcessing: ''
    }

    const MyContract = window.web3.eth.contract([{"constant":false,"inputs":[],"name":"setExperimentInMotion","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSecret","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newState","type":"string"}],"name":"setState","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"peusodoRandomResult","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"you_awesome","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"result","type":"bool"}],"name":"experimentComplete","type":"event"}]);

    // eslint-disable-next-line
    this.state.ContractInstance = MyContract.at('0x484fc9e92bb6aaa0f26b78188229e931c696296a');

    // eslint-disable-next-line
    this.state.event = this.state.ContractInstance.experimentComplete();

    this.getSecret = this.getSecret.bind(this);
    this.getContractState = this.getContractState.bind(this);
    this.handleContractStateSubmit = this.handleContractStateSubmit.bind(this);
    this.setInMotionSomeExperiment = this.setInMotionSomeExperiment.bind(this);
    this.getThresholdState = this.getThresholdState.bind(this);
  }

  getSecret() {
    this.state.ContractInstance.getSecret((err, secret) => {
      if(err) console.error(err);
      console.log('Contract secret:::', secret);
    })
  }

  getContractState() {
    this.state.ContractInstance.getState((err, state) => {
      if(err) console.error(err);
      console.log('Contract state:::', state);
    })
  }

  handleContractStateSubmit(event) {
    event.preventDefault();
    const newState = this.state.contractState;

    this.state.ContractInstance.setState(newState, {
      gas: 300000,
      from: window.web3.eth.accounts[0],
      value: window.web3.toWei(0.01, 'ether')
    }, (err, result) => {
      if (err) console.error(err);
      console.log('Smart contract state changed');
    })
  }

  setInMotionSomeExperiment() {
    this.state.ContractInstance.setExperimentInMotion({
      gas: 300000,
      from: window.web3.eth.accounts[0],
      value: window.web3.toWei(0.01, 'ether')
    }, (err, result) => {
      if (err) console.error(err);
      console.log('Experiment set in motion');
    })
  }

  getThresholdState() {
    this.state.ContractInstance.peusodoRandomResult((err, result) => {
      if (err) console.error(err);
      console.log('It hit:', result);
    })
  }

  render() {
    this.state.event.watch(function (err, e) {
      console.log('this is the event result::', e);
      console.log('this is the experiment result::', e.args.result);
    });

    return (
      <div className='App'>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={ () => this.getSecret() }> Get Secret </button>
        <br />
        <br />
        <button onClick={ () => this.getContractState() }> Get Contract State </button>
        <br />
        <br />
        <button onClick={ () => this.setInMotionSomeExperiment() }> Set Experiment In Motion </button>
        <br />
        <br />
        <button onClick={ () => this.getThresholdState() }> Did It Hit Some Threshold </button>
        <br />
        <br />

        <form onSubmit={this.handleContractStateSubmit}>
          <input type="test" name="state-change" placeholder="Enter new state here..." value={this.state.contractState} onChange={ event => this.setState({ contractState: event.target.value })}></input>
          <button type="submit"> Submit </button>
        </form>

      </div>
    );
  }
}

export default App;
