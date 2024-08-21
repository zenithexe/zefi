"use client";
import GeneratSeed from "@/components/GenerateSeed";
import React, { useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import SeedPhrase from "@/components/SeedPhrase";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { HDNodeWallet, Wallet } from "ethers";
import MainWallet from "./MainWallet";

function App() {
  const [showHome, setShowHome] = useState(false);
  const [showSeed, setShowSeed] = useState(false);
  const [showWallet, setShowWallet] = useState(true);

  const [seed, setSeed] = useState([0,1,2,3,4,5,6,7,8,9,10,11])
  const [ethAccIndex,setEthAccIndex] = useState(0);
  const [solAccIndex, setSolAccIndex] = useState(0);
  
  const [ethKeyPair, setEthKeyPair] = useState([])
  const [solKeyPair, setSolKeyPair] = useState([])

  async function generateSeedPhase(){
    const mnemonic = await generateMnemonic();
    const seed = mnemonicToSeed(mnemonic);
    setSeed(seed)
  } 

  function createSolAccount(){
    const path = `m/44'/501'/${solAccIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
  

    setSolAccIndex(solAccIndex+1);
    
  }

  function createEthAccount(){

    const path = `m/44'/60'/${ethAccIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(path);
    
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    const publicKey = wallet.address;

    setEthAccIndex(ethAccIndex+1);

  }

  function deleteSolAccount(index){

  }

  function deleteEthAccount(index) {

  }

  return (
    <>
    <div>
        {showHome && <GeneratSeed generateSeedFn={generateSeedPhase}/>}
        {showSeed && <SeedPhrase seed={seed}/>}
        {showWallet && <MainWallet/>}
    </div>
    </>
  )
}

export default App;
