import { createContext, useContext } from "react";
import { useState } from "react";
import { generateMnemonic, mnemonicToSeed, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { HDNodeWallet, Wallet, ethers } from "ethers";
import bs58 from "bs58";



export const GlobalStateContext = createContext("GlobalState");

export function useGlobalState() {
  return useContext(GlobalStateContext);
}

export function GlobalStateProvider({ children }) {

  const [seed, setSeed] = useState();
  const [mnemonic, setMnemonic] = useState();
  const [ethAccIndex, setEthAccIndex] = useState(0);
  const [solAccIndex, setSolAccIndex] = useState(0);

  const [ethAccounts, setEthAccounts] = useState({});
  const [solAccounts, setSolAccounts] = useState({});


  function clearGlobalState(){
    setSeed('');
    setMnemonic('');
    setEthAccIndex(0);
    setSolAccIndex(0);
    setEthAccounts({});
    setSolAccounts({});
  }

  async function generateSeedPhase() {
    const mnemonic = generateMnemonic();
    const seed = await mnemonicToSeed(mnemonic);
    setSeed(seed);
    setMnemonic(mnemonic);
  }

  function createSolAccount() {
    const path = `m/44'/501'/${solAccIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    const keyPairSet = {
      public: keypair.publicKey.toBase58(),
      private: bs58.encode(keypair.secretKey),
    };

    setSolAccounts((prev) => {
      const accounts = {
        ...prev,
      };
      accounts[solAccIndex]=keyPairSet;
      localStorage.setItem("solAccounts", JSON.stringify(accounts));
      return accounts;
    });

    setSolAccIndex(prev => {
      const index = prev + 1;
      localStorage.setItem('solIndex',index)
      return index;
    });
  }

  function createEthAccount() {
    const path = `m/44'/60'/0'/${ethAccIndex}`;
    const ethWallet = ethers.Wallet.fromPhrase(mnemonic, path);

    
    const privateKey = ethWallet.privateKey;
    const publicKey = ethWallet.publicKey;

    const keyPairSet = {
      public: publicKey,
      private: privateKey,
    };

    setEthAccounts((prev) => {
      const index = ethAccIndex;
      const accounts = {
        ...prev,
      };
      accounts[index]=keyPairSet;

      localStorage.setItem("ethAccounts", JSON.stringify(accounts));
      return accounts;
    });

    setEthAccIndex(prev => {
      const index = prev + 1;
      localStorage.setItem('ethIndex',index)
      return index;
    });
  }

  function deleteSolAccount(index) {
    setSolKeyPairs((prev) => {});
  }

  function deleteEthAccount(index) {
    setEthKeyPairs((prev) => {});
  }

  return (
    <GlobalStateContext.Provider value={{
        generateSeedPhase,

        seed,
        setSeed,

        mnemonic,
        setMnemonic,
        
        ethAccIndex,
        setEthAccIndex,
        
        solAccIndex,
        setSolAccIndex,
        
        ethAccounts,
        setEthAccounts,

        solAccounts,
        setSolAccounts,

        createEthAccount,
        createSolAccount,

        clearGlobalState,
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
}
