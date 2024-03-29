import Image from "next/image";
import "./Blockly/App.css"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>this is the pfe project</h1>
      <Image
        src="/logo.svg"
        alt="logo"
        width={200}
        height={200}
        className="App-logo"/>
    </main>
  );
}
