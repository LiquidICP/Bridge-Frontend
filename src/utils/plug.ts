// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

export function plugIsInstalled() {
  if (window.ic.plug !== 'undefined') return true;
  return false;
}

export async function plugIsConnect() {
  if (plugIsInstalled()) {
    const connected = window?.ic?.plug.isConnected();
    return connected;
  }
  return false;
}

export async function getPlugPublicKey() {
  try {
    if (await plugIsConnect()) return true;
    const publicKey = await window.ic.plug.requestConnect();
    return {
      status: true,
      publicKey,
    };
  } catch (error) {
    return {
      status: false,
      error,
    };
  }
}

export async function getPlugAccountID() {
  const connect = await window.ic.plug.requestConnect();
  if (!connect) return false;
  const accountID = window?.ic?.plug.accountId;
  return accountID;
}
