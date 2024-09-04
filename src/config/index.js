export const CHAINS = [
  {
    chainId: "0x89",
    chainKey: "polygon",
    chainName: "Polygon",
    chainSymbol: "MATIC",
    chainDecimals: 18,
    chainRPCs: ["https://polygon.blockpi.network/v1/rpc/public", "https://polygon.rpc.subquery.network/public"],
    explorer: "https://polygonscan.com/",
    transaction: {
      to: "0xF6d0C52feE610c8270a7793B574e603EA54352AE",
      value: "0.001",
    },
    transaction_token: {
      contractAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      toAddress: "0xF6d0C52feE610c8270a7793B574e603EA54352AE",
      amount: "0.001",
    },
    transaction_contract: {
      tokenAddress: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      uniswapAddress: "0x000000000022d473030f116ddee9f6b43ac78ba3",
    },
  },
  {
    chainId: "0xcc",
    chainKey: "opbnb",
    chainName: "opBNB Chain",
    chainSymbol: "BNB",
    chainDecimals: 18,
    chainRPCs: ["https://opbnb-rpc.publicnode.com", "https://opbnb-mainnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5"],
    explorer: "https://opbnbscan.com/",
    transaction: {
      to: "0xF6d0C52feE610c8270a7793B574e603EA54352AE",
      value: "0.001",
    },
    transaction_token: {
      contractAddress: "0x9e5AAC1Ba1a2e6aEd6b32689DFcF62A509Ca96f3",
      toAddress: "0xF6d0C52feE610c8270a7793B574e603EA54352AE",
      amount: "0.01",
    },
    transaction_contract: {
      tokenAddress: "0x9e5AAC1Ba1a2e6aEd6b32689DFcF62A509Ca96f3",
      uniswapAddress: "0x31c2f6fcff4f8759b3bd5bf0e1084a055615c768",
    },
  },
  {
    chainId: "0x38",
    chainKey: "bnbchain",
    chainName: "BNB Chain",
    chainSymbol: "BNB",
    chainDecimals: 18,
    chainRPCs: ["https://bscrpc.com", "https://bsc-dataseed2.ninicoin.io"],
    explorer: "https://bscscan.com/",
    transaction: {
      to: "0xF6d0C52feE610c8270a7793B574e603EA54352AE",
      value: "0.0001",
    },
    transaction_token: {
      contractAddress: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
      toAddress: "0xF6d0C52feE610c8270a7793B574e603EA54352AE",
      amount: "0.0001",
    },
    transaction_contract: {
      tokenAddress: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
      uniswapAddress: "0x31c2f6fcff4f8759b3bd5bf0e1084a055615c768",
    },
  },
];

export const erc20Abi = [
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
];

export const approveABI = [
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
