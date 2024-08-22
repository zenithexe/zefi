"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import {
  ArrowLeftRight,
  CircleArrowDown,
  CircleCheck,
  CirclePlus,
  Copy,
  Send,
  Trash,
  UserRoundPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGlobalState } from "@/provider/GlobalStateProvider";

function NetworkDropdown({ network, setNetwork }) {
  return (
    <>
      <div>
        <Select
          onValueChange={(value) => setNetwork(value)}
          defaultValue={network}
        >
          <SelectTrigger className="w-auto px-4 bg-white  dark:bg-gray-800 border-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Network" />
          </SelectTrigger>
          <SelectContent className="border-none">
            <SelectGroup>
              <SelectLabel>Network</SelectLabel>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="solana">Solana</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

function AccountDropdown({ accounts, setAccountNo }) {
  return (
    <>
      <div>
        <Select onValueChange={(value) => setAccountNo(value)} defaultValue={0}>
          <SelectTrigger className="w-auto px-4 bg-white  dark:bg-gray-800 border-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Network" />
          </SelectTrigger>
          <SelectContent className="border-none">
            <SelectGroup>
              <SelectLabel>Accounts</SelectLabel>
              {accounts.map((acc, index) => (
                <SelectItem key={index} value={index}>
                  Account {index}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

function MainWallet({ setShowHome, setShowWallet }) {
  const [copyPublic, setCopyPublic] = useState(false);
  const [copyPrivate, setCopyPrivate] = useState(false);

  const {
    clearGlobalState,
    ethAccounts,
    createEthAccount,
    solAccounts,
    createSolAccount,
  } = useGlobalState();
  const ethIndexes = Object.keys(ethAccounts);
  const solIndexes = Object.keys(solAccounts);

  const [accountNo, setAccountNo] = useState(ethIndexes[0]);
  const [network, setNetwork] = useState("solana");

  const [privateKey, setPrivateKey] = useState();
  const [publicKey, setPublicKey] = useState();

  useEffect(() => {
    if (network === "ethereum") {
      setAccountNo(ethIndexes[0]);
    } else {
      setAccountNo(solIndexes[0]);
    }
  }, [network]);

  useEffect(() => {
    if (network === "ethereum") {
      setPrivateKey(ethAccounts[accountNo].private);
      setPublicKey(ethAccounts[accountNo].public);
      console.log(ethAccounts[accountNo].private);
      console.log(ethAccounts[accountNo].public);
    } else {
      setPrivateKey(solAccounts[accountNo].private);
      setPublicKey(solAccounts[accountNo].public);
      console.log(solAccounts[accountNo].private);
      console.log(solAccounts[accountNo].public);
    }
  }, [accountNo]);

  function deleteWallet() {
    localStorage.removeItem("wallet");
    localStorage.removeItem("mnemonic");
    localStorage.removeItem("ethIndex");
    localStorage.removeItem("solIndex");
    localStorage.removeItem("ethAccounts");
    localStorage.removeItem("solAccounts");

    clearGlobalState();

    setShowWallet(false);
    setShowHome(true);
  }

  function copyPublicKeyFns(){
    navigator.clipboard.writeText(publicKey);
    setCopyPublic(true)
  }

  function copyPrivateKeyFns(){
    navigator.clipboard.writeText(privateKey);
    setCopyPrivate(true);
  }

  return (
    <>
      <div className="flex w-full  flex-col justify-center items-center">
        <div className="w-full max-w-[700px] lg:w-[700px] m-2 flex flex-col items-center justify-center">
          <div className="z-40 w-full relative p-6 rounded-xl bg-white  dark:bg-gray-800 dark:shadow-lg shadow-2xl dark:shadow-slate-900">
            <div className="flex flex-col gap-4">
              <div className="w-auto flex justify-between">
                <NetworkDropdown network={network} setNetwork={setNetwork} />
                {network == "ethereum" && (
                  <AccountDropdown
                    accounts={ethIndexes}
                    setAccountNo={setAccountNo}
                  />
                )}
                {network == "solana" && (
                  <AccountDropdown
                    accounts={solIndexes}
                    setAccountNo={setAccountNo}
                  />
                )}
              </div>
              <div className="mt-5 flex justify-between items-end">
                <div className="flex gap-5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CirclePlus
                          onClick={(e) => {
                            if (network === "ethereum") {
                              createEthAccount();
                            } else {
                              createSolAccount();
                            }
                          }}
                          className=""
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add Account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><Trash className="w-5" /></TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider> */}
                </div>
                <div className="flex justify-end">
                  <h1 className="mr-3 text-6xl font-medium">0.0001</h1>
                  <p>{network.substring(0, 3).toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[-15px] w-full z-10 relative pt-14 pb-5 px-4 flex flex-col gap-5 bg-gray-100 dark:bg-gray-900 rounded-b-lg">
            <div>
              <h1>
                {network.charAt(0).toUpperCase() + network.substring(1)}:
                Account {accountNo}
              </h1>
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <h1 className="text-xl font-bold">Public Key</h1>
                {!copyPublic ? <Copy onClick={copyPublicKeyFns} className="w-4 cursor-pointer" />: <CircleCheck onClick={copyPublicKeyFns} className="w-4 cursor-pointer"/>}
              </div>
              <p className="py-2 overflow-hidden">{publicKey}</p>
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <h1 className="text-xl font-bold">Private Key</h1>
                {!copyPrivate ? <Copy onClick={copyPrivateKeyFns} className="w-4 cursor-pointer" />: <CircleCheck onClick={copyPrivateKeyFns} className="w-4 cursor-pointer"/>}
              </div>
              <p className="py-2 overflow-hidden">{privateKey}</p>
            </div>
          </div>
        </div>
        <Button onClick={deleteWallet} className="mt-10">
          Delete Wallet
        </Button>
      </div>
    </>
  );
}

export default MainWallet;
