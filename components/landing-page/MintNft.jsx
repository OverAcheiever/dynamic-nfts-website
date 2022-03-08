import React, { useState, useEffect } from "react";
import { useContractWrite } from "wagmi";
import { utils } from "ethers";
import ABI from "../../web3/abi";
import {
  CheckCircleIcon,
  ExternalLinkIcon,
  XCircleIcon,
} from "@heroicons/react/outline";

export default function MintNft() {
  const mintPrice = 0.02;
  const [{ data, error }, mint] = useContractWrite(
    {
      addressOrName: "0xC2036a6D0416F19D04e66D0FdD81cFB5Aee1fB7D",
      contractInterface: ABI,
    },
    "mint",
    {
      overrides: {
        value: utils.parseEther(mintPrice.toString()),
      },
    }
  );
  const [status, setStatus] = useState(null);

  async function mintNft() {
    try {
      mint()
        .then(async (transaction) => {
          setStatus("pending");

          await transaction.data.wait();
          setStatus("success");
        })
        .catch((err) => {
          setStatus("error");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  console.log(data);

  return (
    <>
      {!status ? (
        <button
          className="w-54 px-20 h-14 bg-white text-black"
          onClick={() => mintNft()}
        >
          Mint
        </button>
      ) : status === "pending" ? (
        <svg
          className="animate-spin h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : status === "success" ? (
        <div className="flex flex-col items-center gap-y-3 text-xl">
          <CheckCircleIcon className="w-16 h-16 text-green-400" />
          <a
            href={`https://rinkeby.etherscan.io/tx/${data.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-x-1 hover:underline cursor-pointer"
          >
            View on Etherscan <ExternalLinkIcon className="h-5" />
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-3 text-xl">
          <XCircleIcon className="w-16 h-16 text-red-500" />
          <div className="flex items-center gap-x-1 hover:underline cursor-pointer">
            An error occored.
          </div>
        </div>
      )}
    </>
  );
}
