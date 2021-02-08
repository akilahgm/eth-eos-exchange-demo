export const eosExchangableEscrow = '0xFc98772F21aF15A3af8f56B97CAF3D35168Ab5c8';

export const eosExchangeEthEscrow = {
    address:'0xFc98772F21aF15A3af8f56B97CAF3D35168Ab5c8',
    network:'ropsten',
    transferHash:'Qmc1CYh73qGEBWkdATxmWBDbjaq79SQYutsghrhALDzLw1',
    claimHash:'QmUDEe7S78JBhXgsXYwqtbhZrUT5CTfwNBPWGDJAmvzzuj',
    refundHash:'QmcxBzk8xuKVk1EbPTf6CfMcpkcyfgLtimCufCbaUPX1jh'
}

export const eosExchangableToken = '0x497cA4BE7Ff0e665D4380c987FFfA40dE7e9846d';

export const cordaEscrowContractAddress = '0x2BABb3ea68799Ddcb223bB008543210d8a98C8c7';

export const eosOwner = "fypeostest15"
export const eosEndpoint ='https://eos.greymass.com'
//https://kylin.eosn.io

export const networks = {
    ropsten:'0x2c0afd7eBfB625d73c5535D9A9bf4D843f588EC3',
    rinkeby:'0xDF2C46Fdb4cAc5C98338c1366FD72ed11749952a'
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