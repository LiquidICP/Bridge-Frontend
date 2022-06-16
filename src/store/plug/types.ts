export type PlugState = {
  connected: boolean;
  accountId: string;
  publicKey: any;
  balance: number;
  info: unknown | null,
  isLoading: boolean
};
