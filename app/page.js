import SeedPhrase from "@/components/SeedPhrase";
import GeneratSeed from "../components/GenerateSeed";

export default function Home() {
  return (
    <>
      <main className="-z-10 top-0">
        <div className="flex justify-center items-center h-screen">
          {/* <GeneratSeed /> */}
          <SeedPhrase/>
        </div>
      </main>
    </>
  );
}
