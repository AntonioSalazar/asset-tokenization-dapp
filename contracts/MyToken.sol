// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ASDToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Antonio Salazar Developer Token", "ASDT") {
        _mint(msg.sender, initialSupply);
    }
}

