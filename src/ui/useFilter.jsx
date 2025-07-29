import { useContext } from "react";
import { FilterContext } from "./FilterProvider";

export function useFilter() {
  return useContext(FilterContext);
}
