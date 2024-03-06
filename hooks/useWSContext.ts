import { useContext } from "react";
import { WSContext } from "@/components/providers/WSProvider";

export function useWSContext() {
  return useContext(WSContext);
}
