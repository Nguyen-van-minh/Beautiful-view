import { createContext, useReducer } from "react";
import axios from 'axios'
import { InformationReduser } from "../redusers/InformationReduser";
import { apiUrl } from "./constants";


export const InformationContext = createContext()

const InformationContextProvider = ({ children }) => {
    //state
    const [InformationState, dispatch] = useReducer(InformationReduser, {
        informations: [],
        informationLoading: true
    })

    // get all 
    const getInformation = async () => {
        try {
            const response = await axios.get(`${apiUrl}/information`)
            if (response.data.success) {
                dispatch({ type: 'INFORMATION_LOADED_SUCCESS', payload: response.data.informations })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    // add
    const addInformation = async newInformation => {
        try {
            const response = await axios.post(`${apiUrl}/information/addInformation`, newInformation)
            console.log(newInformation)
            if (response.data.success) {
                dispatch({ type: 'INFORMATION_ADD_SUCCESS', payload: response.data.infomation })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }



    // Update 
    const updateInformation = async (id, data) => {
        try {
            const response = await axios.put(
                `${apiUrl}/information/${id}`,
                data
            )
            if (response.data.success) {
                dispatch({ type: 'UPDATE_INFORMATION', payload: response.data.newInformation })
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }


    const findInformation = informationId => {
        const information = InformationState.informations.find(information => information._id === informationId)
        dispatch({ type: 'FIND_INFORMATION', payload: information })
    }

    //tContextData
    const categoryContextData = { InformationState, getInformation, addInformation, updateInformation, findInformation }
    return (
        <InformationContext.Provider value={categoryContextData}>
            {children}
        </InformationContext.Provider>
    )
}

export default InformationContextProvider