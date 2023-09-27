const Web3 = require('web3');
const DGB = artifacts.require("DGB");
//const ESG = artifacts.require("ESG");

module.exports = function(deployer) {
	deployer.deploy(DGB, 100000);
	//deployer.deploy(ESG);
};

