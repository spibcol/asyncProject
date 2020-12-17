const Web3 = require('web3')
const rpcURL = 'http://127.0.0.1:7545'
const web3 = new Web3(rpcURL)

const contract = require('truffle-contract')
const SmartContract = contract(require('./build/contracts/Migrations.json'))




const contractAbi = [
	{
		"constant": false,
		"inputs": [],
		"name": "sendValueToRenter",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "inRenter",
				"type": "address"
			},
			{
				"name": "inClient",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "val",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "day",
				"type": "uint256"
			}
		],
		"name": "Created",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "client",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "deployer",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "renter",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "value",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

const address = '0x7014B473254ED1b5D1A9dad2f14134f6DCCd8cCa'

const deployer = '0xaC1007614f918D6A5D5F22AE055D0E65f610930f'

const renter = '0x7E4D7a33aBd9B3ab7e15c41854df78d785D01B53';
const client = '0xCB5C5f61e4bACaF28bE01C5cC3cACcdE07899Fce';


//const contract = new web3.eth.Contract(contractAbi, address)

//const contract = require('./smartContract.sol')

// web3.eth.getBlock('latest', (err, result) => {
//     console.log(result);
// })

const getBalances = async (address) => {
    const balance = await web3.eth.getBalance(address).then(console.log)
    return balance;
}

const allBalances = () => {
    getBalances(deployer)
    getBalances(renter)
    getBalances(client)
}



const run = async () => {
    allBalances();

    SmartContract.setProvider(rpcURL);

    const smartContract = await SmartContract.new(
        renter, client, {gas: 20000000, from: deployer}
    )

    await smartContract.sendTransaction({from: renter, value: 13423154})

    await smartContract.sendValueToRenter({from: deployer})

    allBalances();

}

run();

//console.log('contract:', contract)