require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    // networks: {
    //   hardhat: {},
    //   goerli: {
    //     url: 'https://rpc.ankr.com/eth_goerli',
    //     accounts: [`0x${process.env.PRIVATE_KEY}`]
    //   }
    // },
    networks: {
      localhost: {
        url: "http://127.0.0.1:8545",
        chainId: 31337
      },
      hardhat: {
        chainId: 31337
      }
    },
  },
};
