import { Chain } from '@wagmi/core'

export const vicTestNet = {
  id: 89,
  name: 'Viction Testnet',
  network: 'viction',
  nativeCurrency: {
    decimals: 18,
    name: 'Viction',
    symbol: 'VIC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.tomochain.com'],
      webSocket: ['wss://ws.testnet.tomochain.com']
    },
    public: {
      http: ['https://rpc.testnet.tomochain.com'],
      webSocket: ['wss://ws.testnet.tomochain.com']
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://testnet.tomoscan.io' },
  },
} as const satisfies Chain


export const vicMainnet = {
  id: 88,
  name: 'Viction',
  network: 'viction',
  nativeCurrency: {
    decimals: 18,
    name: 'Viction',
    symbol: 'VIC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.tomochain.com	'],
      webSocket: ['wss://ws.tomochain.com']
    },
    public: {
      http: ['https://rpc.tomochain.com'],
      webSocket: ['wss://ws.tomochain.com']
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://www.vicscan.xyz' },
  },
} as const satisfies Chain