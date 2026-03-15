import { CoinGraph } from "./CoinGraph"
import { useState } from "react";

export const GraphRangeSelector = () => {
    const [graphRange , setGraphRange] = useState(1);
    return <div className = "coinGraphBody"> 
    <div className="btns-div">
        <button onClick={() => setGraphRange(1)}>24h</button>
        <button onClick={() => setGraphRange(7)}>7D</button>
        <button onClick={() => setGraphRange(30)}>1M</button> <br />
        <input type="Number" placeholder="Custom Range Eg: 10 | 50" onChange={(event) => setGraphRange(event.target.value)} />
    </div> 
    <CoinGraph graphRange = {graphRange}/>
</div>
    
    
}