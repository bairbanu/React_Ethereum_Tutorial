pragma solidity ^0.4.11;

import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract ReactExample {
  using strings for *;

  address owner;
  string public you_awesome;
  string private secret;
  string private state;
  bool public peusodoRandomResult;

  event experimentComplete(bool result);

  function ReactExample() {
    owner = msg.sender;
    you_awesome = "You're awesome!";
    secret = "secret data";
    state = "Initial state";
    peusodoRandomResult = true;
  }

  function kill() {
    require(msg.sender == owner);
    selfdestruct(owner);
  }

  // get some secret data from contract
  function getSecret() constant returns (string) {
    return secret;
  }

  // get some state from contract
  function getState() view returns (string) {
    return state;
  }

  // set new state to contract
  function setState(string newState) payable {
    state = newState;
  }

  // set an experiment that returns whether data met some threshold
  function setExperimentInMotion() payable returns (bool) {
    bytes32 _peusodoRandomResult = keccak256(msg.sender, msg.value, msg.data);
    if (_peusodoRandomResult > bytes32(10)) peusodoRandomResult = true;
    else peusodoRandomResult = false;

    // emit event for React front-end
    experimentComplete(peusodoRandomResult);
  }

  // fallback function in case someone sends ether to this contract
  function() payable {}
}
