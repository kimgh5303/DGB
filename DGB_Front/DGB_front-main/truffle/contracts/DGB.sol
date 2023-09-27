// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13; // (1) version pragma

contract DGB {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    address public admin;
    mapping (address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Reward(address indexed to, uint256 value);
    event Confiscate(address indexed from, uint256 value);
    event Invest(address indexed from, uint256 value);
    event Increase(uint256 value, uint256 totalSupply);
    event Decrease(uint256 value, uint256 totalSupply);

    modifier isAdmin() {if(msg.sender == admin)_;}

    constructor (uint256 _supply) {
        admin = msg.sender;
        balanceOf[msg.sender] = _supply;
        name = "DGB";
        symbol = "don";
        decimals = 0;
        totalSupply = _supply;
    }

    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] > _value);
        require(balanceOf[_to] + _value > balanceOf[_to]);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] +=_value;
        emit Transfer(msg.sender, _to, _value);
    }

    // comment + review
    function reward(uint256 _value) public {
        balanceOf[admin] -= _value;
        balanceOf[msg.sender] +=_value;
        emit Reward(msg.sender, _value);
    }
    
    // invest
    function invest(address _from, uint256 _value) public isAdmin{
        balanceOf[admin] += _value;
        balanceOf[_from] -=_value;
        emit Invest(_from, _value);
    }

    // confiscate
    function confiscate(address _from, uint256 _value) public isAdmin {
        balanceOf[admin] += _value;
        balanceOf[_from] -=_value;
        emit Confiscate(_from, _value);
    }

    // increase totalSupply
    function increase(uint256 _value) public isAdmin{
        balanceOf[admin] += _value;
        totalSupply +=_value;
        emit Increase(_value, totalSupply);
    }

    // decrease totalSupply
    function decrease(uint256 _value) public isAdmin{
        balanceOf[admin] -= _value;
        totalSupply -=_value;
        emit Decrease(_value, totalSupply);
    }
}
