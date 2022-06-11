import { createContext, useReducer } from "react";
import axios from 'axios'
import { CartReduser } from "../redusers/CartReduser";
import { apiUrl } from "./constants";


export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    //state
    const [CartState, dispatch] = useReducer(CartReduser, {
        items: [],
        cartLoading: true
    })

    // get all 
    const getAllItem = async (userId) => {
        try {
            const response = await axios.post(`${apiUrl}/cart`, userId)

            if (response.data.success) {
                dispatch({ type: 'CART_LOADED_SUCCESS', payload: response.data.items })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    // add
    const addToCart = async newItem => {
        try {
            const response = await axios.post(`${apiUrl}/cart/addToCart`, newItem)
            if (response.data.success) {
                dispatch({ type: 'CART_ADD_SUCCESS', payload: response.data.item })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //delete
    const deleteItem = async itemId => {
        try {
            const response = await axios.delete(`${apiUrl}/cart/${itemId}`)
            if (response.data.success)
                dispatch({ type: 'DELETE_CART', payload: itemId })
        } catch (error) {
            console.log(error)
        }
    }

    //delete
    const deleteAllItems = async userId => {
        try {
            const response = await axios.delete(`${apiUrl}/cart/deleteManyItems/${userId}`)
            if (response.data.success)
                dispatch({ type: 'DELETE_ALL_ITEMS', payload: [] })
        } catch (error) {
            console.log(error)
        }
    }


    // Update 
    const updateCart = async (data) => {
        try {
            const response = await axios.put(
                `${apiUrl}/cart/${data._id}`, data
            )
            if (response.data.success) {
                dispatch({ type: 'UPDATE_CART', payload: response.data.cartItem })
                console.log(response.data)
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }




    //tContextData
    const cartContextData = { CartState, getAllItem, addToCart, deleteItem, updateCart, deleteAllItems }
    return (
        <CartContext.Provider value={cartContextData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider