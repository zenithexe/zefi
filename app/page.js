import SeedPhrase from "@/components/SeedPhrase";
import HomeView from "../components/HomeView";
import MainWallet from "./MainWallet";
import AppProvider from "./AppProvider";

export default function Home() {
  return (
    <>
      <main className="-z-10 top-0">
        <div className="flex justify-center items-center h-screen">
            <AppProvider />
        </div>
      </main>
    </>
  );
}
