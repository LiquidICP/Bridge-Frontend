export const getShortAddress = (address?: string | null, pos = 4) => (address ? `${address.substring(0, pos)}...${address.substring(address.length - 4)}` : undefined);
