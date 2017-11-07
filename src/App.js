import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
-- For Oakland Blockchain Developers Meetup
-- 10/19/2017 @ Learners Guild workspace
*/

/* Phase x -- shows beginning of phase x */

/* Phase 2 -- Setting Up and Interacting with React */
class App extends Component {
  constructor (props) {
    super (props);

    /* Phase 2 */
    /* Edit this with each iteration of Smart Contract */
    /* Note: this ABI is a placeholder and will not work */
    const MyContract = window.web3.eth.contract([{"constant":false,"inputs":[],"name":"setExperimentInMotion","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"querySecret","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newState","type":"string"}],"name":"setState","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"peusodoRandomResult","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"you_awesome","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"result","type":"bool"}],"name":"ExperimentComplete","type":"event"}]);

    this.state = {
      /* Phase 2 */
      /* Edit this with each iteration of Smart Contract */
      /* Note: this adress is a placeholder and will not work */
      ContractInstance: MyContract.at ('0x00e50958bb425d94ff2e45a022a6585808229f13'),
      /* Phase 3 -- Smart Contract State Manipulation */
      contractState: ''
    }

    /* Phase 2 */
    this.querySecret = this.querySecret.bind (this);

    /* Phase 3 */
    this.queryContractState = this.queryContractState.bind (this);
    this.handleContractStateSubmit = this.handleContractStateSubmit.bind (this);

    /* Phase 4 -- Conditionals on Smart Contract */
    this.queryConditionResult = this.queryConditionResult.bind (this);
    this.activateExperiment = this.activateExperiment.bind (this);

    this.state.event = this.state.ContractInstance.ExperimentComplete();
  }

  /* Phase 2 */
  querySecret () {
    const { getSecret } = this.state.ContractInstance;

    getSecret ((err, secret) => {
      if (err) console.error ('An error occured::::', err);
      console.log ('This is our contract\'s secret::::', secret);
    })
  }

  /* Phase 3 */
  queryContractState () {
    const { getState } = this.state.ContractInstance;

    getState ((err, state) => {
      if (err) console.error ('An error occured::::', err);
      console.log ('This is our contract\'s state::::', state);
    })
  }

  /* Phase 3 */
  handleContractStateSubmit (event) {
    event.preventDefault ();

    const { setState } = this.state.ContractInstance;
    const { contractState: newState } = this.state;

    setState (
      newState,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei (0.01, 'ether')
      }, (err, result) => {
        console.log ('Smart contract state is changing.');
      }
    )
  }

  /* Phase 4 */
  queryConditionResult () {
    const { pseudoRandomResult } = this.state.ContractInstance;

    pseudoRandomResult ((err, result) => {
      console.log ('This is the smart contract conditional::::', result);
    })
  }

  /* Phase 4 */
  activateExperiment () {
    const { setExperimentInMotion } = this.state.ContractInstance;

    setExperimentInMotion ({
      gas: 300000,
      from: window.web3.eth.accounts[0],
      value: window.web3.toWei (0.01, 'ether')
    }, (err, result) => {
      console.log ('Experiment to determine true or false set in motion.');
    })
  }


  render () {
    /* Phase 4 */
    this.state.event.watch ((err, event) => {
      if (err) console.error ('An error occured::::', err);
      console.log ('This is the event::::', event);
      console.log ('This is the experiment result::::', event.args.result);
    });

    return (
      <div className='App'>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> React & Ethereum Simple Application </h1>
        </header>

        {/* Phase 2 */}
        <br />
        <br />
        <button onClick={ this.querySecret }> Query Smart Contract's Secret </button>
        <br />
        <br />

        {/* Phase 3 */}
        <button onClick={ this.queryContractState }> Query Smart Contract's State </button>
        <br />
        <br />
        <form onSubmit={ this.handleContractStateSubmit }>
          <input
            type="text"
            name="state-change"
            placeholder="Enter new state..."
            value ={ this.state.contractState }
            onChange={ event => this.setState ({ contractState: event.target.value }) } />
          <button type="submit"> Submit </button>
        </form>

        {/* Phase 4 */}
        <br />
        <br />
        <button onClick={ this.queryConditionResult }> Query Smart Contract Conditional Result </button>
        <br />
        <br />
        <button onClick={ this.activateExperiment }> Start Experiment on Smart Contract </button>

      </div>
    );
  }
}

export default App;
