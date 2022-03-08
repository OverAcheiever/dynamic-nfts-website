import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full h-24 flex items-center justify-between">
      <div></div>
      <div className="grid grid-flow-col gap-x-10 text-xl">
        <Link href="/">
          <a className="hover:underline">Home</a>
        </Link>

        <Link href="/wallet">
          <a className="hover:underline">Wallet</a>
        </Link>
      </div>
      <div></div>
    </div>
  );
}
