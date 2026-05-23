import { Link, NavLink } from "react-router-dom"
import { useContext } from "react"
import { cryptoDataContext } from "./ContextApi"
export const Display = () => {
    const context = useContext(cryptoDataContext)
    const tabLogo = document.getElementById("tabLogo") as HTMLLinkElement
    tabLogo.href = "Logo.avif";
    if (!context?.cryptoData.length) {
        return (
            <table>
                <thead>
                    <tr id="noData">
                        <th>Rank</th>
                        <th>Logo</th>
                        <th>Name</th> 
                        <th>Symbol</th>
                        <th>Market Cap</th>
                        <th>Price INR</th>
                        <th>Circulating Supply</th>
                    </tr>
                </thead>

                <tbody>
                    <tr id="ndf">
                        <td colSpan={7}>NO DATA FOUND</td>
                    </tr>
                </tbody>
            </table>
        )
    }
    return (
   
        <table>
            <thead><tr><th>Rank</th><th>Logo</th><th>Name</th><th>Symbol</th><th>Market Cap</th><th>Price INR</th><th>Circulating Supply</th></tr></thead>
            <tbody>
                {
                    context.visibleCount.map((data, index) => (data.id.includes(context.search) || data.symbol.includes(context.search)) &&(
                        <tr key={index} title = { "Last Update: "+data.last_updated }>
                            <td>{data.market_cap_rank}</td>
                            <td><img src={data.image} alt="img" /></td>
                            <td><Link to={`/coin/${data.id}` }>{data.id}</Link></td> 
                            <td>{data.symbol}</td>
                            <td>{data.market_cap.toLocaleString()}</td>
                            <td>{data.current_price.toLocaleString()}</td>
                            <td>{data.circulating_supply.toLocaleString()}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}