"use client"
import { FundTwoTone } from "@ant-design/icons";
import { createContext, useContext, useState } from "react"


const ScopeOneContext = createContext();

export function ScopeOneProvider({ children }) {

    const [checkedValuesScopeOne, setCheckedValuesScopeOne] = useState([]);
    const [selectedValuesScopeOne, setSelectedValuesScopeOne] = useState({});
    const [selectedFuels, setSelectedFuels] = useState({});

    return (

        <ScopeOneContext.Provider

            value={{ checkedValuesScopeOne, setCheckedValuesScopeOne, selectedValuesScopeOne, setSelectedValuesScopeOne, selectedFuels, setSelectedFuels }}>
            {children}


 
        </ScopeOneContext.Provider>



    )


}

export function useScopeOne() {


    return useContext(ScopeOneContext)


}