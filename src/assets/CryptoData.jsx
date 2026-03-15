import { useEffect, useState } from "react"
import { ErrorMessage } from "./ErrorMessage";
import { Display } from "./Display";
import { Loading } from "./Loading";
import { useContext } from "react";
import { cryptoDataContect } from "./ContextApi";
export const CryptoData = () => {
    const {cryptoData ,networkIssue,setVisibleCount , search ,setSearch,loading } = useContext(cryptoDataContect)

    const handleChanges = (event) => {
        setSearch(event.target.value.toLowerCase().trim())
        event.target.value.trim() ?  
            setVisibleCount(cryptoData.slice(0)) : 
                setVisibleCount(cryptoData.slice(0, 10));
    }
    
    return (
        <div id="dataPage">
            <div id="inputBar">
                <input type="text" id="userInput" value={search}
                    placeholder="Seach Here"
                    onChange={handleChanges} />
            </div>
            {networkIssue && <ErrorMessage />}
            {(!loading && <Display /> ) || (loading && <Loading />)}
        </div>
    )
}
