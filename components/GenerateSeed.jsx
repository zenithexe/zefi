"use client";
import { Button } from "@/components/ui/button";
import React from "react";
function GeneratSeed() {
  return (
    <>
      <main className="-z-10 top-0">
        <div className="flex justify-center items-center h-screen">
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-9xl text-center font-bold">Fck fiat;</h1>
              <h1 className="text-lg tracking-wider font-mono text-center font-bold">
                Welcome to the future of money
              </h1>
            </div>
            <div className="flex justify-center mt-20">
              <Button className="px-10 py-6 rounded-full">
                <div className="text-xl font-bold">Create Wallet</div>
              </Button>
            </div>
            <div className="mt-20">
              <p className="text-center">Built on Ethereum and Solana</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default GeneratSeed;
