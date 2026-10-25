"use client";

import { usePathname } from "next/navigation";
import Navigation2 from "./Navigation2";
import Footer2 from "./Footer2";
import RunningText from "./RunningText";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const isSynapse = usePathname()?.startsWith("/synapsex");
  return <>{!isSynapse && <><Navigation2 /><RunningText /></>}{children}{!isSynapse && <Footer2 />}</>;
}
