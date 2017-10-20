import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
-- For Oakland Blockchain Developers Meetup
-- 10/19/2017 @ Learners Guild workspace
*/

// Phase 2 -- Setting up and Interacting with React
class App extends Component {
  constructor(props) {
    super(props);
    // Phase 3 -- Contract State Manipulation
    this.state = {
      contractState: ''
    }

    // Phase 2 -- edit this with each iteration of Smart Contract
    const MyContract = window.web3.eth.contract([{"constant":false,"inputs":[],"name":"setExperimentInMotion","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSecret","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newState","type":"string"}],"name":"setState","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"peusodoRandomResult","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"you_awesome","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"result","type":"bool"}],"name":"experimentComplete","type":"event"}]);

    // Phase 2 -- edit this with each iteration of Smart Contract
    // eslint-disable-next-line
    this.state.ContractInstance = MyContract.at('0xf5cf0e32a4a8a1ca9e25732b41640051654cad0c');

    // Phase 2
    this.getSecret = this.getSecret.bind(this);

    // Phase 3
    this.getContractState = this.getContractState.bind(this);
    this.handleContractStateSubmit = this.handleContractStateSubmit.bind(this);

    // Phase 4 -- Conditionals on Smart Contract
    this.setInMotionSomeExperiment = this.setInMotionSomeExperiment.bind(this);
    this.getThresholdState = this.getThresholdState.bind(this);
    // eslint-disable-next-line
    this.state.event = this.state.ContractInstance.experimentComplete();
  }

  // Phase 2
  getSecret() {
    this.state.ContractInstance.getSecret((err, secret) => {
      if(err) console.error(err);
      console.log('Contract secret:::', secret);
    })
  }

  // Phase 3
  getContractState() {
    this.state.ContractInstance.getState((err, state) => {
      if(err) console.error(err);
      console.log('Contract state:::', state);
    })
  }

  // Phase 3
  handleContractStateSubmit(event) {
    event.preventDefault();
    const newState = this.state.contractState;

    this.state.ContractInstance.setState(newState, {
      gas: 300000,
      from: window.web3.eth.accounts[0],
      value: window.web3.toWei(0.01, 'ether')
    }, (err, result) => {
      if (err) console.error(err);
      console.log('Smart contract state is changing');
    })
  }

  // Phase 4
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

  // Phase 4
  getThresholdState() {
    this.state.ContractInstance.peusodoRandomResult((err, result) => {
      if (err) console.error(err);
      console.log('It hit:', result);
    })
  }

  render() {
    // Phase 4
    this.state.event.watch(function (err, e) {
      console.log('this is the event result::', e);
      console.log('this is the experiment result::', e.args.result);
    });

    return (
      <div className='App'>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React & Ethereum Simple App</h1>
        </header>

        {/* Phase 2 */}
        <br />
        <br />
        <button onClick={ () => this.getSecret() }> Get Secret </button>
        <br />
        <br />

        {/* Phase 3 */}
        <button onClick={ () => this.getContractState() }> Get Contract State </button>
        <br />
        <br />
        <form onSubmit={this.handleContractStateSubmit}>
          <input type="test" name="state-change" placeholder="Enter new state here..." value={this.state.contractState} onChange={ event => this.setState({ contractState: event.target.value })}></input>
          <button type="submit"> Submit </button>
        </form>
        <br />
        <br />

        {/* Phase 4 */}
        <button onClick={ () => this.setInMotionSomeExperiment() }> Set Experiment In Motion / Engage a Conditional </button>
        <br />
        <br />
        <button onClick={ () => this.getThresholdState() }> Did It Hit Some Threshold </button>
        <br />
        <br />

      </div>
    );
  }
}

export default App;
