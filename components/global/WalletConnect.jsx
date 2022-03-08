import React, { useEffect } from "react";
import { useConnect, useAccount, useNetwork } from "wagmi";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

export default function WalletConnect({ setIsConnected }) {
  const chainId = 4;
  const [connection, connect] = useConnect();
  const [network, switchNetwork] = useNetwork();
  const WalletConnect = new WalletConnectConnector({
    options: {
      qrcode: true,
    },
  });
  const connectors = connection.data.connectors;

  // update isConnected state when connection status changes and if it is correct network
  useEffect(() => {
    if (connection.data.connected && network.data.chain.id === chainId) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [network]);

  return (
    <div>
      {!connection.data.connected ? (
        <div className="flex flex-col gap-y-3 text-black text-md">
          {connectors.map((x, key) => (
            <button
              key={key}
              onClick={() => connect(x)}
              className="w-48 py-4 bg-white"
            >
              {x.name}
            </button>
          ))}
        </div>
      ) : connection.data.connected && network.data.chain.id !== chainId ? (
        <button
          onClick={() => (switchNetwork ? switchNetwork(chainId) : null)}
          className="bg-white text-black px-10 py-4"
        >
          {switchNetwork ? "Switch Network" : "Switch Network in your Wallet"}
        </button>
      ) : null}
    </div>
  );
}
