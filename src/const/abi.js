const tokenABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "isContract",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "escrowAddress",
				"type": "address"
			},
			{
				"internalType": "string[]",
				"name": "args",
				"type": "string[]"
			}
		],
		"name": "transferAndCallEscrow",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const escrowABI = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "LogEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "exchangeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "LogExchangeEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "queryId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "LogNewProvableQuery",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "LogProvableQueryError",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "myid",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "result",
				"type": "string"
			}
		],
		"name": "__callback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_myid",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_result",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "_proof",
				"type": "bytes"
			}
		],
		"name": "__callback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "exchangeId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "claimReadHash",
				"type": "string"
			}
		],
		"name": "claimTokens",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "exchangeFromId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "exchangeId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "correspondingId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "sendingToken",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "expectedToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "sendingAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expectedAmount",
				"type": "uint256"
			},
			{
				"internalType": "enum EthEscrow.PaymentStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "callbackStatus",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "exchangeIdFromQuery",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "exchangeIdsFromSender",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "exchanges",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "exchangeId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "correspondingId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "sendingToken",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "expectedToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "sendingAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expectedAmount",
				"type": "uint256"
			},
			{
				"internalType": "enum EthEscrow.PaymentStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "callbackStatus",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "sendingToken",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "expectedToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "sendingAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expectedAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "correspondingId",
				"type": "uint256"
			}
		],
		"name": "getClaimability",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "getExchangeIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "sendingToken",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "expectedToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "sendingAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expectedAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "correspondingId",
				"type": "uint256"
			}
		],
		"name": "getRefundability",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "sendingToken",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "expectedToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "sendingAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expectedAmount",
				"type": "uint256"
			}
		],
		"name": "getTransactionStatus",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "args",
				"type": "string[]"
			}
		],
		"name": "onEscrowReceived",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "queries",
		"outputs": [
			{
				"internalType": "enum EthEscrow.QueryType",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "receivedCorrespondingIds",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "exchangeId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "refundReadHash",
				"type": "string"
			}
		],
		"name": "requestRefund",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_targetEscrow",
				"type": "string"
			}
		],
		"name": "setTargetEscrow",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "targetEscrow",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const EOSEscrowABI = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "LogEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "exchangeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "LogExchangeEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "queryId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "LogNewProvableQuery",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "LogProvableQueryError",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "myid",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "result",
				"type": "string"
			}
		],
		"name": "__callback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_myid",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_result",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "_proof",
				"type": "bytes"
			}
		],
		"name": "__callback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "exchangeId",
				"type": "uint256"
			},
			{
				"internalType": "string[]",
				"name": "args",
				"type": "string[]"
			}
		],
		"name": "claimTokens",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "exchangeFromId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "exchangeId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "correspondingId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "sendingToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "sendingAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "expectedAsset",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "eosSender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "eosReceiver",
				"type": "string"
			},
			{
				"internalType": "enum EOSEscrow.PaymentStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "callbackStatus",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "exchangeIdFromQuery",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "exchangeIdsFromSender",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "exchanges",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "exchangeId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "correspondingId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "sendingToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "sendingAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "expectedAsset",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "eosSender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "eosReceiver",
				"type": "string"
			},
			{
				"internalType": "enum EOSEscrow.PaymentStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "callbackStatus",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "sendingToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "sendingAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "expectedAsset",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "eosSender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "eosReceiver",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "correspondingId",
				"type": "string"
			}
		],
		"name": "getClaimability",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "getExchangeIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "sendingToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "sendingAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "expectedAsset",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "eosSender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "eosReceiver",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "correspondingId",
				"type": "string"
			}
		],
		"name": "getRefundability",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "contract ERC22",
				"name": "sendingToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "sendingAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "expectedAsset",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "eosSender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "eosReceiver",
				"type": "string"
			}
		],
		"name": "getTransactionStatus",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "args",
				"type": "string[]"
			}
		],
		"name": "onEscrowReceived",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "queries",
		"outputs": [
			{
				"internalType": "enum EOSEscrow.QueryType",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "receivedCorrespondingIds",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "exchangeId",
				"type": "uint256"
			},
			{
				"internalType": "string[]",
				"name": "args",
				"type": "string[]"
			}
		],
		"name": "requestRefund",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const cordaEscrowABI = [
  {
    inputs: [],
    stateMutability: 'payable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'description',
        type: 'string'
      }
    ],
    name: 'LogEvent',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'exchangeId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'description',
        type: 'string'
      }
    ],
    name: 'LogExchangeEvent',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'queryId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'description',
        type: 'string'
      }
    ],
    name: 'LogNewProvableQuery',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'description',
        type: 'string'
      }
    ],
    name: 'LogProvableQueryError',
    type: 'event'
  },
  {
    stateMutability: 'payable',
    type: 'fallback'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'myid',
        type: 'bytes32'
      },
      {
        internalType: 'string',
        name: 'result',
        type: 'string'
      }
    ],
    name: '__callback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_myid',
        type: 'bytes32'
      },
      {
        internalType: 'string',
        name: '_result',
        type: 'string'
      },
      {
        internalType: 'bytes',
        name: '_proof',
        type: 'bytes'
      }
    ],
    name: '__callback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'IP',
        type: 'string'
      }
    ],
    name: 'changeCordaIP',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newPrice',
        type: 'uint256'
      }
    ],
    name: 'changePrice',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'exchangeId',
        type: 'uint256'
      }
    ],
    name: 'claimPayment',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'cordaAccount',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'expectedShares',
        type: 'uint256'
      }
    ],
    name: 'createExchange',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'exchangeFromId',
    outputs: [
      {
        internalType: 'uint256',
        name: 'exchangeId',
        type: 'uint256'
      },
      {
        internalType: 'address payable',
        name: 'sender',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'cordaAccount',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'ethereumAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'numbrOfShares',
        type: 'uint256'
      },
      {
        internalType: 'enum IPOEscrow.PaymentStatus',
        name: 'status',
        type: 'uint8'
      },
      {
        internalType: 'string',
        name: 'callbackStatus',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'exchangeIdFromQuery',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'exchangeIdsFromSender',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'exchanngeIDs',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAllExchangeIds',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getCordaIP',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'getUserExchangeIds',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'priceOfShare',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'queries',
    outputs: [
      {
        internalType: 'enum IPOEscrow.QueryType',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'exchangeId',
        type: 'uint256'
      }
    ],
    name: 'requestRefund',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_i',
        type: 'uint256'
      }
    ],
    name: 'uintToStr',
    outputs: [
      {
        internalType: 'string',
        name: '_uintAsString',
        type: 'string'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  }
];
exports.tokenABI = tokenABI;
exports.escrowABI = escrowABI;
exports.EOSEscrowABI = EOSEscrowABI;
exports.eosExchangableTokenABI = tokenABI;
exports.cordaEscrowABI = cordaEscrowABI;