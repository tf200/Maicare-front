import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "HealtyTool",
  description: "This is Home for HealtyTool",
  // other metadata
};

export default function Home() {
  redirect("/dashboard/crm");
}
