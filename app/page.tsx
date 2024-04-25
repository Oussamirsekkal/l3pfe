import Image from "next/image";
import "./Blockly/App.css"
import Whyus from "@/app/components/whyus";
import Main from "@/app/components/main";

export default function Home() {
  return (
    <main className="flex min-h-auto flex-col items-center justify-between p-0">
        <Main/>
      <Whyus/>

    </main>
  );
}
