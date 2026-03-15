import { useState, useEffect } from 'react'
import Logo from './assets/Images/Logo.png'
import { CryptoData } from './assets/CryptoData'
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import { EachPage } from './assets/EachPage';
import { CoinGraph } from './assets/CoinGraph';
import { cryptoDataContect } from './assets/ContextApi';
import axios from "axios";
import { Link } from 'react-router-dom';
import './App.css'

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [theme, setTheme] = useState("dark")
  const [networkIssue, setNetworkIssue] = useState(false);
  const [visibleCount, setVisibleCount] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CryptoData />
    },
    {
      path: "/coin/:urlName",
      element: <div>
        <EachPage cryptoData={cryptoData} />
      </div>
    },
    {
      path: "*",
      element: <>
        <h3>Page Not Found</h3>
        <Link to = "/"><button >Home</button></Link>
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
          <button onClick={() => setTheme((theme == "dark") ? "white" : "dark")}>{(theme == "dark") ? "White" : "Dark"}</button>
        </nav>

        <cryptoDataContect.Provider value={{
          cryptoData, setCryptoData, networkIssue, setNetworkIssue,
          visibleCount, setVisibleCount, search, setSearch, loading, setLoading}}>

          <RouterProvider router={router} />

        </cryptoDataContect.Provider>
      </div>
    )
  }
}

export default App
