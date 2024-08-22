"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Copy, CircleCheck } from "lucide-react";
import { useGlobalState } from "@/provider/GlobalStateProvider";

function SeedPhrase({ setShowSeed, setShowWallet }) {
  const [copied, setCopied] = useState(false);

  const { mnemonic, createEthAccount, createSolAccount } = useGlobalState();
  const seedPhase = mnemonic?.split(" ");

  function handleOpenWallet() {
    localStorage.setItem("wallet", true);
    localStorage.setItem("mnemonic", mnemonic);

    createEthAccount();
    createSolAccount();

    setShowSeed(false);
    setShowWallet(true);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center border-1 p-10 rounded-lg">
        <div className="mb-2 text-7xl font-bold">Seed Phase</div>
        <div className="text-lg font-mono">Make sure to keep it safe.</div>
        <div className="mt-5  w-full flex justify-end py-4">
          {copied ? (
            <Button
              onClick={() => {
                navigator.clipboard.writeText(mnemonic);
              }}
              className="bg-slate-100 dark:bg-gray-900 text-gray-400 dark:text-gray-500"
            >
              <CircleCheck className="w-5 mr-2" />
              <p className="font-bold">Copied</p>
            </Button>
          ) : (
            <Button
              onClick={() => {
                navigator.clipboard.writeText(mnemonic);
                setCopied(true);
              }}
              className="bg-slate-100 dark:bg-gray-900 text-gray-400 dark:text-gray-500"
            >
              <Copy className="w-5 mr-2" />
              <p className="font-bold">Copy</p>
            </Button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {seedPhase?.map((eachPhase, index) => (
            <div
              key={index}
              className="text-2xl pl-5 pr-28 py-4 font-semibold text-left bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-slate-800  rounded-2xl"
            >
              {eachPhase}
            </div>
          ))}
        </div>
        <div className="mt-20 w-full flex justify-center">
          <Button
            onClick={handleOpenWallet}
            className="w-[30%] py-6 bg-gray-800 dark:bg-white"
          >
            <div className="font-bold dark:text-gray-700">Open Wallet</div>
          </Button>
        </div>
      </div>
    </>
  );
}

export default SeedPhrase;
