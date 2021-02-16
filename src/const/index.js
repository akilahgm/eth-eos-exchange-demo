
export const eosExchangeEthEscrow = {
    address:'0x2dC94B9bAB7d7e6eea2566ad4a771a0B589C1124',
    network:'ropsten',
    transferHash:'Qmc1CYh73qGEBWkdATxmWBDbjaq79SQYutsghrhALDzLw1',
    claimHash:'QmVeFJk1twy5RU6omYkmEzBQ8vSpJDE79n6YjTGWKuNEhg',
    refundHash:'QmPtP7vZqwapK8ExiRtMCKBQRm83sAmYGXAZsBULXUFoJD',
    readHash:'QmdGcK9UrMEuuuJtvnsj3vGXEBJz3fYVGXG9Rn7e322MDK',
    claimFromEosHash:'QmUDEe7S78JBhXgsXYwqtbhZrUT5CTfwNBPWGDJAmvzzuj',
    refundFromEosHash:'QmcxBzk8xuKVk1EbPTf6CfMcpkcyfgLtimCufCbaUPX1jh'
}

export const eosExchangableToken = '0x497cA4BE7Ff0e665D4380c987FFfA40dE7e9846d';

export const cordaEscrowContractAddress = '0xbC750Ac25bB2dD32f050565399F7803a1BD73D55';

export const eosOwner = "fypeostest15"
export const eosEndpoint ='https://eos.dfuse.eosnation.io'
//https://kylin.eosn.io

export const networks = {
    ropsten:'0xa241DAF42b3f46DB547fa7f3aFA121Dfaef6503E',
    rinkeby:'0x6c87F65eBC116E2c0db94Ab705589C4221A30Eb5'
}

export const networkList = [
    {
        name:'ropsten',
        address:networks.ropsten
    },
    {
        name:'rinkeby',
        address:networks.rinkeby
    }
]

export const tokenList = [
    {
        name:'ROP-TOKEN1',
        address:'0x497cA4BE7Ff0e665D4380c987FFfA40dE7e9846d',
        network:'ropsten',
        escrow:networks.ropsten
    },
    {
        name:'ROP-TOKEN2',
        address:'0xA5c1B134aFE3804566B6235dBD52b8D903Db2A7F',
        network:'ropsten',
        escrow:networks.ropsten
    },
    {
        name:'RIN-TOKEN1',
        escrow:networks.rinkeby,
        network:'rinkeby',
        address:'0xC79aCcB72a4e6e636A0A31E8f1F8FDacD62051F3'
    },
    {
        name:'RIN-TOKEN2',
        escrow:networks.rinkeby,
        network:'rinkeby',
        address:'0x669EA3d3f5f0B925DCE590500F2CC73e98cef198'
    }
]

//old ipfs hashes
// transfer :'QmZu1dcNRVSUnK6WyEJADFDU2z11XYLWoeAETkxJfEiks6'
// claim :'QmPHHDW32TYw5WbPenTffRSH5ZYVhecmrnAVMpAfT1f5da'
// refund : 'Qmar8Tbwrsbd4UwhkVsVTtc9XNtc9j7CZ5JVJRKntFqaDK'