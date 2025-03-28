"use client"
import { createContext, useContext, useState } from "react"


const ScopeOneContext = createContext();

export function ScopeOneProvider({ children }) {

    const [checkedValuesScopeOne, setCheckedValuesScopeOne] = useState([]);
    const [selectedValuesScopeOne, setSelectedValuesScopeOne] = useState({});
    const [selectedFuels, setSelectedFuels] = useState({});
    const [activities, setActivities] = useState([]);
    const [fetchedParameters, setFetchedParameters] = useState({});
    const [userId, setUserId] = useState("");
    const [user_Id, setUser_Id] = useState("");
    const [templatecontent, settemplatecontent] = useState("");
    const [selectedShift, setSelectedShift] = useState("");
    // 🔹 Add shift state
    const [data, setData] = useState([]); // data entry page
    const [editTemplate, setEditTemplate] = useState("Create");
    const [allEntries, setAllEntries] = useState([]);
    const [fetchedCheckedValues, setFetchedCheckedValues] = useState([]);

    return (

        <ScopeOneContext.Provider

            value={{
                userId, setUserId, allEntries, setAllEntries,data, setData,user_Id, setUser_Id,
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
                setFetchedParameters,
                editTemplate, setEditTemplate, fetchedCheckedValues, setFetchedCheckedValues


            }}>
            {children}



        </ScopeOneContext.Provider>



    )


}

export function useScopeOne() {


    return useContext(ScopeOneContext)


}