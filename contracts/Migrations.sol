pragma solidity >=0.4.22 <0.9.0;

contract Borrow {

    address payable public deployer;

    address payable public renter;
    address payable public client;

    uint256 public value;
    //uint public daily;

    event Created(uint val, uint day);

    constructor(address payable inRenter, address payable inClient) public{
        deployer = msg.sender;

        renter = inRenter;
        client = inClient;

        value = 0;
    }

    function () external payable {
        require (client == msg.sender);
        value += msg.value;
    }

    function sendValueToRenter () public {
        require (deployer == msg.sender);

        renter.transfer(value);
    }

}
