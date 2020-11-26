const tokenABI = [
    {
        "inputs": [],
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
                "internalType": "address",
                "name": "receiver",
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
                "internalType": "string",
                "name": "readHash",
                "type": "string"
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
];

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
         "name": "EventTriggered",
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
         "name": "LogNewProvableQuery",
         "type": "event"
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
             }
         ],
         "name": "checkCompletion",
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
                 "internalType": "enum Escrow.PaymentStatus",
                 "name": "status",
                 "type": "uint8"
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
                 "internalType": "enum Escrow.PaymentStatus",
                 "name": "status",
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
                 "internalType": "uint256",
                 "name": "exchangeId",
                 "type": "uint256"
             }
         ],
         "name": "getExchangeStatus",
         "outputs": [
             {
                 "internalType": "enum Escrow.PaymentStatus",
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
                 "internalType": "string",
                 "name": "readHash",
                 "type": "string"
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
                 "internalType": "enum Escrow.QueryType",
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
 ];

const counterABI = [
      {
          "constant": false,
          "inputs": [
              {
                  "name": "amount",
                  "type": "uint256"
              }
          ],
          "name": "increaseCount",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [],
          "name": "resetCounter",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "constant": true,
          "inputs": [
              {
                  "name": "num1",
                  "type": "uint256"
              },
              {
                  "name": "num2",
                  "type": "uint256"
              },
              {
                  "name": "num3",
                  "type": "uint256"
              }
          ],
          "name": "addNumbers",
          "outputs": [
              {
                  "name": "",
                  "type": "uint256"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [],
          "name": "count",
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
  ];

export {tokenABI,escrowABI,counterABI}