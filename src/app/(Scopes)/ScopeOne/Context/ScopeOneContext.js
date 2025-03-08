"use client"
import { createContext, useContext, useState } from "react"


const ScopeOneContext = createContext();

export function ScopeOneProvider({ children }) {

    const [checkedValuesScopeOne, setCheckedValuesScopeOne] = useState([]);
    const [selectedValuesScopeOne, setSelectedValuesScopeOne] = useState({});
    const [selectedFuels, setSelectedFuels] = useState({});
    const [activities, setActivities] = useState([]);
    const [fetchedParameters, setFetchedParameters] = useState({});
    const[userId,setUserId] = useState("")
    const [templatecontent, settemplatecontent] = useState("");
    const [selectedShift, setSelectedShift] = useState(""); // 🔹 Add shift state

    return (

        <ScopeOneContext.Provider

            value={{
                userId,setUserId,
                templatecontent, settemplatecontent,
                selectedShift, setSelectedShift,
                checkedValuesScopeOne,
                setCheckedValuesScopeOne,
                selectedValuesScopeOne,
                setSelectedValuesScopeOne,
                selectedFuels,
                setSelectedFuels,
                activities,
                setActivities,
                fetchedParameters,
                setFetchedParameters
            }}>
            {children}



        </ScopeOneContext.Provider>



    )


}

export function useScopeOne() {


    return useContext(ScopeOneContext)


}