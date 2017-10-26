pragma solidity ^0.4.11;

/*
-- For Oakland Blockchain Developers Meetup
-- 10/19/2017 @ Learners Guild workspace
*/

// Phase 0 -- Basic Contract Scaffold
// Phase 1 -- Interacting with Public Variables
// Phase 2 -- Setting up and Interacting with React
// Phase 3 -- Contract State Manipulation
// Phase 4 -- Conditionals on Smart Contract

contract ReactExample {
  // Phase 0
  address owner;
  // Phase 1
  string public you_awesome;
  // Phase 2
  string private secret;
  // Phase 3
  string private state;
  // Phase 4
  bool public peusodoRandomResult;
  event experimentComplete(bool result);

  // Phase 0
  function ReactExample() {
    owner = msg.sender;
    // Phase 1
    you_awesome = "You're awesome!";
    // Phase 2
    secret = "secret data";
    // Phase 3
    state = "Initial state";
    // Phase 4
    peusodoRandomResult = true;
  }

  // Phase 0
  // Offer owner contract a way to destroy contract if it gets compromised
  function kill() {
    require(msg.sender == owner);
    selfdestruct(owner);
  }

  // Phase 2
  // Get some secret data from contract
  function getSecret() constant returns (string) {
    return secret;
  }

  // Phase 3
  // Get some state from contract
  function getState() view returns (string) {
    return state;
  }

  // Phase 3
  // Set new state to contract
  function setState(string newState) payable {
    state = newState;
  }

  // Phase 4
  // Set an experiment that returns whether data met some threshold
  function setExperimentInMotion() payable returns (bool) {
    bytes32 _peusodoRandomResult = keccak256(msg.sender, msg.value, msg.data);
    // Some conditional depending on application's intention
    if (_peusodoRandomResult > bytes32(10)) peusodoRandomResult = true;
    else peusodoRandomResult = false;

    // Emit event for React front-end
    experimentComplete(peusodoRandomResult);
  }

  // Phase 0
  // Fallback function in case someone sends ether to this contract
  function() payable {
    revert();
  }
}
