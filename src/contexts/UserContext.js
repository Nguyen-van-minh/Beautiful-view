// Quan ly toan bo trang thai cua app lien quan den xac thuc nguoi dung
import { createContext, useReducer } from "react";
import axios from 'axios'
import { UserReduser } from "../redusers/UserReduser";
import { apiUrl } from "./constants";

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    const [userState, dispatch] = useReducer(UserReduser, {
        loading: true,
        listUser: []
    })

    // get all 
    const getAllUser = async (userId) => {
        try {
            const response = await axios.get(`${apiUrl}/user/getAllUser`)
            if (response.data.success) {
                dispatch({ type: 'USERS_LOADED_SUCCESS', payload: response.data.ListUser })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //add user
    const addUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/user/register`, userForm)
            if (response.data.success) {
                dispatch({ type: 'ADD_USERS_SUCCESS', payload: response.data.newUser })
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }


    //delete
    const deleteUser = async userId => {
        try {
            const response = await axios.delete(`${apiUrl}/user/${userId}`)
            if (response.data.success)
                dispatch({ type: 'DELETE_USER', payload: userId })
        } catch (error) {
            console.log(error)
        }
    }


    // Update 
    const updateUser = async updatedUser => {
        try {
            const response = await axios.put(
                `${apiUrl}/user/${updatedUser._id}`,
                updatedUser
            )
            if (response.data.success) {
                dispatch({ type: 'UPDATE_USER', payload: response.data.user })
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }

    //update pass
    const updatePass = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/user/changePass`, data)
            if (response.data.success) {
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }

    }

    //update Information
    const updateInformation = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/user/updateInformation`, data)
            if (response.data.success) {
                dispatch({ type: 'UPDATE_USER', payload: response.data.user })
                console.log(response.data.user)
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }

    }


    const userContextData = { getAllUser, addUser, deleteUser, updateUser, updatePass, updateInformation, userState }

    // Return provider
    return (
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider