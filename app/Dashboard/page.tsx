
import { Metadata } from "next";
import Dashboard from "@/app/Dashboard/components/dashboard";

export const metadata: Metadata = {
   title:
       "Dashboard",
   description: "",
};

export default function Home() {
   return (
       <>
<Dashboard />
       </>
   );
}
