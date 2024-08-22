"use client";
import Home from "@/components/HomeView";
import React, { useEffect, useState } from "react";
import { generateMnemonic, mnemonicToSeed, mnemonicToSeedSync } from "bip39";
import SeedPhrase from "@/components/SeedPhrase";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { HDNodeWallet, Wallet, ethers } from "ethers";
import MainWallet from "./MainWallet";
import bs58 from "bs58";
import { useGlobalState } from "@/provider/GlobalStateProvider";

function App() {
  const [showHome, setShowHome] = useState(true);
  const [showSeed, setShowSeed] = useState(false);
  const [showWallet, setShowWallet] = useState(false);

  const {setMnemonic, setSeed, setEthAccIndex, setEthAccounts, setSolAccIndex, setSolAccounts} = useGlobalState();

  async function getSeed(mnemonic){
    const seed = await mnemonicToSeed(mnemonic);
    setSeed(seed)
  }

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    const mnemonic = localStorage.getItem("mnemonic");

    const ethAccounts = JSON.parse(localStorage.getItem("ethAccounts"));
    const solAccounts = JSON.parse(localStorage.getItem("solAccounts"));

    const ethAccountIndex = parseInt(localStorage.getItem("ethIndex"));
    const solAccountIndex = parseInt(localStorage.getItem("solIndex"));

    if (wallet) {
      console.log('Triggereddd');


      setShowHome(false);
      setShowWallet(true);

      setMnemonic(mnemonic);
      getSeed(mnemonic)
      
      setEthAccounts(ethAccounts);
      setSolAccounts(solAccounts);


      setEthAccIndex(ethAccountIndex);
      setSolAccIndex(solAccountIndex);

    }
  }, []);

  return (
    <>
        <div className="w-full max-w-[900px]">
          {showHome && (
            <Home
              setShowHome={setShowHome}
              setShowSeed={setShowSeed}
            />
          )}
          {showSeed && (
            <SeedPhrase
              setShowSeed={setShowSeed}
              setShowWallet={setShowWallet}
            />
          )}
          {showWallet && (
            <MainWallet
              setShowHome={setShowHome}
              setShowWallet={setShowWallet}
            />
          )}
        </div>
    </>
  );
}

export default App;
