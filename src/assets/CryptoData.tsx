import React, { useEffect, useState } from "react"
import { ErrorMessage } from "./ErrorMessage";
import { Display } from "./Display";
import { Loading } from "./Loading";
import { useContext } from "react";
import { cryptoDataContext } from "./ContextApi";
export const CryptoData = () => {
    const context = useContext(cryptoDataContext)
    const handleChanges = (event: React.ChangeEvent<HTMLInputElement>): void => {
        context?.setSearch(event.target.value.toLowerCase().trim())
        event.target.value.trim() ?  
            context?.setVisibleCount(context.cryptoData.slice(0)) : 
                context?.setVisibleCount(context.cryptoData.slice(0, 10));
    }
    
    return (
        <div id="dataPage">
            <div id="inputBar">
                <input type="text" id="userInput" value={context?.search}
                    placeholder="Seach Here"
                    onChange={(event) => handleChanges(event)} />
            </div>
            {context?.networkIssue && <ErrorMessage />}
            {(!context?.loading && <Display /> ) || (context?.loading && <Loading />)}
        </div>
    )
}
