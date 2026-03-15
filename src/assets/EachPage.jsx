import { useParams } from "react-router-dom"
import { ErrorMessage } from "./ErrorMessage";
import { CoinGraph } from "./CoinGraph";
import { useContext } from "react";
import { cryptoDataContect } from "./ContextApi";
import { GraphRangeSelector } from "./GraphRangeSelector";


export const EachPage = ( ) => {
    const {cryptoData} = useContext(cryptoDataContect)
    const { urlName } = useParams()
    const index = cryptoData.findIndex((cryptoData) => cryptoData.id == urlName);
    if(index < 0 ) return <h1>Page Not Found</h1>
    const tabLogo = document.getElementById("tabLogo");
    tabLogo.href = cryptoData[index].image;
    return <>
    <GraphRangeSelector />
    </>

}
