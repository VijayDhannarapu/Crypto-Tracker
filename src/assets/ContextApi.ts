import { createContext } from "react";
import type { Data } from "../App.js";
type Context = {
    cryptoData: Data[],
    setCryptoData: React.Dispatch<React.SetStateAction<Data[]>>
    networkIssue: boolean
    setNetworkIssue: React.Dispatch<React.SetStateAction<boolean>>
    visibleCount: Data[],
    setVisibleCount: React.Dispatch<React.SetStateAction<Data[]>>,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
export const cryptoDataContext = createContext<Context | null>(null);