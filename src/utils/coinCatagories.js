export const Layer1 = [
  "bitcoin", "ethereum", "cardano", "solana", "binancecoin", "avalanche",
  "polkadot", "cosmos", "algorand", "near protocol", "hedera",
  "tezos", "elrond", "harmony", "flow", "internet computer",
  "fantom", "tron", "kadena", "ripple", "zilliqa"
];

export const Layer2 = [
  "polygon", "arbitrum", "optimism", "immutable x", "loopring",
  "starknet", "zksync", "boba network", "metisdao", "cartesi",
  "omg network", "fuel", "aztec", "hermez", "celer network",
  "mantle", "shardeum", "scroll", "linea"
];

export const DeFiTokens = [
  "uniswap", "aave", "maker", "compound", "curve",
  "sushiswap", "balancer", "yearn finance", "dydx",
  "pancakeswap", "gmx", "thorchain", "kava", "venus",
  "instadapp", "harvest finance", "liquity", "staked-ether", "wrapped-steth", "maple finance"
];

export const StableCoins = [
  "tether", "usd coin", "binance usd", "dai", "trueusd",
  "pax dollar", "gemini dollar", "frax", "terraclassicusd", "susd",
  "fei usd", "reserve rights", "husd", "eurs", "alchemix usd",
  "celo dollar", "liquity usd", "usdcoin", "uxd protocol", "usdj"
];

export const MemeCoins = [
  "dogecoin", "shiba inu", "pepe", "floki inu", "baby doge coin",
  "dogebonk", "dogelon mars", "samoyedcoin", "pitbull", "catecoin",
  "hoge finance", "kishu inu", "monacoin", "akita inu", "banano",
  "woofy", "shiba predator", "volt inu", "saitama"
];

export const COIN_DESC = Object.freeze({
  // Layer 1
  bitcoin: "The first cryptocurrency and digital gold.",
  ethereum: "Smart contract network for apps and DeFi.",
  cardano: "Proof-of-stake blockchain for scalability.",
  solana: "Fast blockchain with low fees.",
  avalanche: "Chain for custom blockchains and DeFi.",
  polkadot: "Network connecting multiple blockchains.",
  cosmos: "Framework for interoperable blockchains.",
  algorand: "Eco-friendly chain for payments and DeFi.",
  near_protocol: "Scalable, developer-friendly blockchain.",
  hedera: "Hashgraph ledger for fast apps.",
  tezos: "Smart contract chain that upgrades itself.",
  elrond: "Sharded chain for speed and scale.",
  harmony: "Cross-chain sharded blockchain.",
  flow: "Chain for NFTs and games.",
  internet_computer: "Blockchain aiming to replace cloud servers.",
  fantom: "Low-cost chain popular for DeFi.",
  tron: "Chain for apps, tokens, and media.",
  kadena: "Enterprise blockchain with hybrid design.",
  zilliqa: "Sharded blockchain for high throughput.",
  binancecoin: "BNB Chain for DeFi and exchange apps.",
  ripple: "Ledger for cheap, fast payments.",

  // Layer 2
  polygon: "Ethereum sidechain for low-cost txns.",
  arbitrum: "Ethereum rollup for speed and cost.",
  optimism: "Layer 2 rollup scaling Ethereum.",
  immutable_x: "NFT trading with no gas fees.",
  loopring: "DEX using zk-rollups.",
  starknet: "Secure zk-rollup for Ethereum.",
  zksync: "Fast zk-rollup payments on Ethereum.",
  boba_network: "Rollup with hybrid compute.",
  metisdao: "Layer 2 for DAOs and apps.",
  cartesi: "Linux-based Layer 2 contracts.",
  omg_network: "Plasma chain for Ethereum scaling.",
  fuel: "Execution layer for rollups.",
  aztec: "Privacy zk-rollup for Ethereum.",
  hermez: "zk-rollup scaling Ethereum.",
  celer_network: "Cross-chain scaling platform.",
  mantle: "Modular Layer 2 on Ethereum.",
  shardeum: "EVM chain with sharding.",
  scroll: "zk-rollup scaling Ethereum.",
  linea: "zkEVM Layer 2 by Consensys.",

  // DeFi Tokens
  uniswap: "Leading DEX for token swaps.",
  aave: "DeFi protocol for lending and borrowing.",
  maker: "DAO behind the DAI stablecoin.",
  compound: "Lending and interest via contracts.",
  curve: "DEX for stablecoin swaps.",
  sushiswap: "Community-run DEX forked from Uniswap.",
  balancer: "DEX with multi-asset pools.",
  yearn_finance: "Automates DeFi yield strategies.",
  dydx: "DEX for derivatives and futures.",
  pancakeswap: "Main DEX on BNB Chain.",
  gmx: "Perpetual trading DEX.",
  thorchain: "Cross-chain swaps of native assets.",
  kava: "DeFi lending and stablecoin platform.",
  venus: "Money markets on BNB Chain.",
  instadapp: "Smart wallet for DeFi apps.",
  harvest_finance: "Auto-compounding yield farming.",
  liquity: "ETH-backed loans with 0% interest.",
  maple_finance: "On-chain credit for institutions.",
  stakedether: "Tokenized staked ETH by Lido.",
  wrappedsteth: "Wrapped stETH for DeFi apps.",

  // Stablecoins
  tether: "Most used USD-pegged stablecoin.",
  usdcoin: "USD-backed stablecoin by Circle.",
  binance_usd: "USD-pegged stablecoin by Binance.",
  dai: "Decentralized USD stablecoin by Maker.",
  trueusd: "Regulated USD-backed stablecoin.",
  pax_dollar: "USD stablecoin issued by Paxos.",
  gemini_dollar: "USD stablecoin from Gemini.",
  frax: "Hybrid algorithmic stablecoin.",
  terraclassicusd: "Collapsed Terra USD token.",
  susd: "Synthetic USD by Synthetix.",
  fei_usd: "Algorithmic USD stablecoin.",
  reserve_rights: "Governance token for RSR.",
  husd: "Stablecoin once backed by Huobi.",
  eurs: "Euro-backed stablecoin.",
  alchemix_usd: "Self-repaying stablecoin.",
  celo_dollar: "Stablecoin on Celo network.",
  liquity_usd: "Stablecoin from Liquity loans.",
  uxd_protocol: "Delta-neutral stablecoin.",
  usdj: "Stablecoin backed on Tron.",

  // Meme Coins
  dogecoin: "The first meme coin, inspired by Doge.",
  shiba_inu: "Dogecoin-style token on Ethereum.",
  pepe: "Meme token from Pepe the Frog.",
  floki_inu: "Coin named after Musk’s dog.",
  baby_doge_coin: "Dogecoin spinoff with community.",
  dogebonk: "Humor-driven meme coin.",
  dogelon_mars: "Space-themed Dogecoin spinoff.",
  samoyedcoin: "Dog meme coin on Solana.",
  pitbull: "Community meme coin with staking.",
  catecoin: "Meme coin for creators.",
  hoge_finance: "Deflationary meme coin with burns.",
  kishu_inu: "Dog meme coin on Ethereum.",
  monacoin: "First Japanese meme coin.",
  akita_inu: "Dogecoin-style meme rival.",
  banano: "Feeless meme coin from Nano.",
  woofy: "Companion token to YFI.",
  shiba_predator: "Rival token to Shiba Inu.",
  volt_inu: "Deflationary meme coin.",
  saitama: "Meme coin for education."
});
