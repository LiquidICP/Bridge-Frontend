export enum NetworkName {
  PolygonMainnet = 'Polygon Mainnet',
  MumbaiTestnet = 'Mumbai Testnet',
}

export const networkChainIds: Record<NetworkName, string> = {
  [NetworkName.PolygonMainnet]: '0x89',
  [NetworkName.MumbaiTestnet]: '0x13881',
};

type Chain = {
  chainId: string,
  chainName: string,
  nativeCurrency: {
    name: string,
    symbol: string,
    decimals: number,
  },
  rpcUrls: string[],
  blockExplorerUrls: string[],
};

type Chains = Record<NetworkName, Chain>;

const nativeCurrency = {
  name: 'MATIC',
  symbol: 'MATIC',
  decimals: 18,
};

export const chains: Chains = {
  [NetworkName.MumbaiTestnet]: {
    chainId: networkChainIds[NetworkName.MumbaiTestnet],
    chainName: NetworkName.MumbaiTestnet,
    nativeCurrency,
    rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
  [NetworkName.PolygonMainnet]: {
    chainId: networkChainIds[NetworkName.PolygonMainnet],
    chainName: NetworkName.PolygonMainnet,
    nativeCurrency,
    rpcUrls: ['https://rpc-mainnet.matic.network'],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
};
