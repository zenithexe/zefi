'use client';

import React from "react";
import { Button } from "./ui/button";
function GeneratSeed({generateSeedFn}) {
  return (
    <>
      <div className="-z-10 top-0">
        <div className="flex justify-center items-center h-screen">
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-9xl text-center font-bold">Fck fiat;</h1>
              <h1 className="text-lg tracking-wider font-mono text-center font-bold">
                Welcome to the future of money
              </h1>
            </div>
            <div className="flex justify-center mt-20">
              <Button onClick={generateSeedFn} className="px-10 py-6 rounded-full cursor-pointer">
                <p className="text-xl font-bold">Create Wallet</p>
              </Button>
            </div>
            <div className="mt-20">
              <p className="text-center">Built on Ethereum and Solana</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneratSeed;
