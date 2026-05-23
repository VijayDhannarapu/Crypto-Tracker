import { useState, useEffect } from 'react'
import Logo from './assets/Images/Logo.png'
import { CryptoData } from './assets/CryptoData';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EachPage } from './assets/EachPage';
import { cryptoDataContext } from './assets/ContextApi'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { PageNotFound } from './assets/PageNotFound';
import axios from "axios";
import './App.css'

export type Theme = 'dark' | 'light'
export type Data = {
  id: string
  symbol: string
  last_updated: string
  market_cap_rank: number
  image: string
  market_cap: number
  current_price: number
  circulating_supply: string
}

const App = () => {
  const [cryptoData, setCryptoData] = useState<Data[]>([]);
  const [theme, setTheme] = useState<Theme>("dark")
  const [networkIssue, setNetworkIssue] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<Data[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CryptoData />
    },
    {
      path: "/coin/:urlName",
      element: <div>
        <EachPage />
      </div>
    },
    {
      path: "*",
      element: <>
        <PageNotFound />
      </>
    }
  ])

  useEffect(() => {
    async function getData() {
      try {
        document.title = `Crypto Tracker`
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false");
        setCryptoData(res.data);
        setNetworkIssue(false)
        setVisibleCount(res.data.slice(0, 10));
        setLoading(false)
      }
      catch (error) {
        setLoading(false)
        setNetworkIssue(true)
      }
    }
    getData();
  }, [])

  if (cryptoData) {
    return (
      <div id='body' className={theme}>
        <nav>
          <h1>Crypto Tracker <img src={Logo} alt="logo" /> </h1>
          <button onClick={() => setTheme((theme == 'dark') ? 'light' : 'dark')}>{(theme == "dark") ?
            <FontAwesomeIcon icon={faSun} /> :
            <FontAwesomeIcon icon={faMoon} />} </button>
        </nav>
        <cryptoDataContext.Provider value={{
          cryptoData, setCryptoData, networkIssue, setNetworkIssue,
          visibleCount, setVisibleCount, search, setSearch, loading, setLoading
        }}>
          <RouterProvider router={router} />

        </cryptoDataContext.Provider>
      </div>
    )

  }
}

export default App
