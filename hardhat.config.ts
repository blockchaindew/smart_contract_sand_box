import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const defaultNetwork = "hardhat";
const REPORT_GAS = process.env.REPORT_GAS !== undefined;
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const POLYSCAN_API_KEY = process.env.POLYSCAN_API_KEY || "";
const MNEMONIC = process.env.MNEMONIC || "";
const ALCHEMY_KEY = process.env.ALCHEMY_KEY || "";

const config: HardhatUserConfig = {
  defaultNetwork,
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99_999,
          },
          viaIR: true,
        },
      },
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99_999,
          },
          viaIR: true,
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },

  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      // initialBaseFeePerGas: 0, // optional: makes gas reports deterministic
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
      accounts: [`0x${PRIVATE_KEY}`],
      // gasPrice: 21000,
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      chainId: 5,
      accounts: {
        mnemonic: MNEMONIC,
      },
      gasPrice: 50_000_000_000, // 50 gwei
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      chainId: 11155111,
      accounts: [`0x${PRIVATE_KEY}`],
      // gasPrice: 5_000_000, // minimum gas price in network
    },
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      sepolia: ETHERSCAN_API_KEY,
      polygonMumbai: POLYSCAN_API_KEY,
      ariseMainnet: "API_KEY",
    },
    customChains: [],
  },
};
export default config;
