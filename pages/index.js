import React, { useState } from "react";
import Header from "../components/global/Header";
import WalletConnect from "../components/global/WalletConnect";
import MintNft from "../components/landing-page/MintNft";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="relative w-screen h-screen flex flex-col bg-black text-white space-r">
      <Header />
      <div className="relative w-full h-full flex items-center justify-center">
        <div className={`${isConnected ? "hidden" : "block"}`}>
          <WalletConnect setIsConnected={setIsConnected} />
        </div>
        {isConnected ? <MintNft /> : null}
      </div>
    </div>
  );
}
