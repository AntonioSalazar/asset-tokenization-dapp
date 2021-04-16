// SPDX-License-Identifier: MIT
pragma solidity ^0.6.1;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ASDToken is ERC20 {
    constructor(uint256 initialSupply) public  ERC20  () {
        _mint(msg.sender, initialSupply);
    }
}

