import axios from "axios";
import zoomPlugin from "chartjs-plugin-zoom"
import { Chart as ChartJs } from "chart.js/auto";
ChartJs.register(zoomPlugin);

import {  useContext, useState } from "react";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { cryptoDataContect } from "./ContextApi";
import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";

export const CoinGraph = ({graphRange}) => {
    const {urlName} = useParams()
    const [graphData, setGraphData] = useState([]);
    const {networkIssue ,setNetworkIssue, loading, setLoading } = useContext(cryptoDataContect)

    useEffect(() => {
        async function getGraphData() {
            try{
                document.title = `${urlName.toLocaleUpperCase().slice(0,1) + urlName.toLocaleLowerCase().slice(1) + " Analysis"}`
                setLoading((prev) => true)
                const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${urlName}/market_chart?vs_currency=inr&days=${graphRange}`)
                setNetworkIssue(false);
                setLoading((prev) => false)
                setGraphData( res.data.prices.map((item) => {
                    return {
                        price: item[1],
                        shortDate : new Date(item[0]).toLocaleString("en-IN" , {
                            day : "2-digit" ,
                            month : "short"
                        }),
                        fullDate: new Date(item[0]).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                    }
                }))
            }    
            catch(error){
               console.log(error)
               setLoading(false)
               setNetworkIssue(true)
            }    
        }
        getGraphData();
        
    }, [graphRange])

    if(graphData === null){
        return <h1>Loading...</h1>
    }
  const firstPrice = graphData[0]?.price;
  const lastPrice = graphData[graphData.length - 1]?.price;
  const lineColor = lastPrice >= firstPrice ? "green" : "red";

  if(loading){
    return <Loading />
  }
  if(networkIssue){
    return <ErrorMessage />
  }

    return <div className="coinGraphBody">
        <h1>Analysis </h1>
        <div style={{height:'400px' }}>
            <Line style={{height : "400px"}}
            data={{
                labels: graphData.map((item) => item.shortDate) ,
                datasets: [{
                    label: "Price: ₹",
                    data: graphData.map((item) => item.price),
                    borderColor : lineColor,
                    backgroundColor:(lineColor === 'red') ? 'rgba(192, 75, 83, 0.2)' : 'rgba(75, 192, 192, 0.2)',
                    fill : true,
                    pointHoverBorderColor : (lineColor == "red" ? "green" : "red"),
                    pointHoverBorderWidth : 10
                }]
            }}
            options={{
                responsive : true ,
                maintainAspectRatio : false,
                plugins :{
                    tooltip : {
                        callbacks : {
                            title : function(context){
                                return graphData[context[0].dataIndex].fullDate;
                            }
                        }
                    }
                    ,
                    title : {
                        display : true,
                        text : `${urlName} Analysis`
                    },

                    zoom : {
                        zoom : {
                            wheel : {
                                enabled : true
                            } ,
                            pinch : {
                                enabled : true
                            },
                            mode : 'x'
                        },
                        pan : {
                            enabled : true ,
                            mode : 'x'
                        }
                    },
                    

                } 
            }}
        />
        <p>Graph From Last : {graphRange} day</p>
        </div>

    </div>
}
