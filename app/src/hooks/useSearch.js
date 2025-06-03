import { useContext } from "react";
import { SearchContext } from "@/src/contexts";

export const useSearch = () => useContext(SearchContext);
