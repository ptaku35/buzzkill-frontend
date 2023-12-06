export type BlocTraceUser = {
  profile_id: string;
  wallet_address: string;
  business_name: string;
  business_number: string;
  business_category: string;
  email_address: string;
};

export type WagmiUserSession = {
  id: string; // "3w0EyC6fbv9N0yxhm",
  domain: string; // "localhost:3000",
  chainId: string; //  43113,
  address: string; // "0xa9d4cF2a82aE4338c5B6FFA4bC4B704aa906D2B3",
  uri: string; // "http://localhost:3000",
  version: number; // "1",
  nonce: string; // "nnc1n7EivINzSnEp1",
  profileId: string; // "0x3b0958dd0a2040a23f3bcdbaa12b30b6b7393354381ac05c1090bd8639283ebb",
  payload: string; // null
};
