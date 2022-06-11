// Quan ly toan bo trang thai cua app lien quan den xac thuc nguoi dung
import { createContext, useReducer, useEffect } from "react";
import axios from 'axios'
import { authReduser } from "../redusers/AuthReduser";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReduser, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
        isCustomer: false,

    })



    // Authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}/user`)

            if (response.data.success && response.data.user.role !== 3) {
                console.log(response.data.user.role)
                dispatch({
                    type: 'SET_AUTH',
                    payload: { user: response.data.user, isCustomer: true }
                })
            }

            if (response.data.success && response.data.user.role === 3) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: response.data.user }
                })
            }

        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            })
        }
    }

    useEffect(() => loadUser(), [])

    //login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/user/login`, userForm)
            if (response.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                )

            await loadUser()

            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }

    //register
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/user/register`, userForm)
            console.log(response.data)
            if (response.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                )

            await loadUser()

            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }


    //logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null, isCustomer: false }
        })
    }


    const authContextData = { loginUser, registerUser, logoutUser, authState, loadUser }

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider