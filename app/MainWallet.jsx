import React from "react";
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
  CirclePlus,
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

function NetworkDropdown() {
  return (
    <>
      <div>
        <Select defaultValue="ethereum">
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

function AccountDropdown({ accounts }) {
  return (
    <>
      <div>
        <Select defaultValue={0}>
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

function MainWallet() {
  const accounts = [0, 1, 2, 3, 4];
  return (
    <>
      <div className="flex w-full flex-col justify-center items-center">
        <div className="w-full max-w-[900px] m-2 flex flex-col items-center justify-center">
          <div className="z-40 w-full relative p-6 rounded-xl bg-white  dark:bg-gray-800 dark:shadow-lg shadow-2xl dark:shadow-slate-900">
            <div className="flex flex-col gap-4">
              <div className="w-full flex justify-between">
                <NetworkDropdown />
                <AccountDropdown accounts={accounts} />
              </div>
              <div className="mt-5 flex justify-between items-end">
                <div className="flex gap-5">
                  {/* <Send />
                  <CircleArrowDown />
                  <ArrowLeftRight /> */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><CirclePlus className="w-5" /></TooltipTrigger>
                      <TooltipContent>
                        <p>Add Account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><Trash className="w-5" /></TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                </div>
                <div className="flex justify-end">
                  <h1 className="mr-3 text-6xl font-medium">0.0001</h1>
                  <p>ETH</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[-15px] w-full z-10 relative pt-14 pb-5 px-4 flex flex-col gap-5 bg-gray-100 dark:bg-gray-900 rounded-b-lg">
            <div>
              <h1>Ethereum: Account 1</h1>
            </div>
            <div>
              <h1 className="text-xl font-bold">Public Key</h1>
              <p className="py-2 overflow-hidden">
                dasdadadasdadadadsadadadadadhsgahjgdhjagdjhgajhdgajhgsdjakhgdadada
              </p>
            </div>
            <div>
              <h1 className="text-xl font-bold">Private Key</h1>
              <p>dasdadadadadadadadadsadadsadasdadad</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainWallet;
