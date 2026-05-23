import { useParams } from "react-router-dom"
import { ErrorMessage } from "./ErrorMessage";
import { CoinGraph } from "./CoinGraph";
import { useContext } from "react";
import { cryptoDataContext } from "./ContextApi";
import { GraphRangeSelector } from "./GraphRangeSelector";


export const EachPage = () => {
    const context = useContext(cryptoDataContext)
    const { urlName } = useParams()
    const index: number = (context?.cryptoData.findIndex((cryptoData) => cryptoData.id == urlName)) ?? -1;
    if (index < 0) return <h1>Page Not Found</h1>
    else {
        const tabLogo = document.getElementById("tabLogo") as HTMLLinkElement;
        tabLogo.href = context!.cryptoData[index].image 
        return <>
            <GraphRangeSelector />
        </>
    }

}
