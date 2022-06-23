import { createContext, useReducer } from "react";
import axios from 'axios'
import { OrderReduser } from "../redusers/OrderReduser";
import { apiUrl } from "./constants";

export const OrderContext = createContext()

const OrderContextProvider = ({ children }) => {

    //state
    const [OrderState, dispatch] = useReducer(OrderReduser, {
        orders: [],
        orderLoading: true,
    })

    // get all by id
    const getAllOrder = async (userId) => {
        try {
            const response = await axios.post(`${apiUrl}/order`, userId)
            if (response.data.success) {
                dispatch({ type: 'ORDER_LOADED_SUCCESS', payload: response.data.orders.reverse() })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    const getAll = async () => {
        try {
            const response = await axios.get(`${apiUrl}/order`)
            if (response.data.success) {
                dispatch({ type: 'All_LOADED_SUCCESS', payload: response.data.orders.reverse() })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    // add
    const addOrder = async newOrder => {
        try {
            const response = await axios.post(`${apiUrl}/order/addOrder`, newOrder)
            if (response.data.success) {
                dispatch({ type: 'ORDER_ADD_SUCCESS', payload: response.data.order })
                return response.data

            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }
    //delete
    const deleteOrder = async orderId => {
        try {
            const response = await axios.delete(`${apiUrl}/order/${orderId}`)
            if (response.data.success)
                dispatch({ type: 'DELETE_ORDER', payload: orderId })
        } catch (error) {
            console.log(error)
        }
    }



    // Update 
    const updateOrder = async (data) => {
        try {
            const response = await axios.put(
                `${apiUrl}/order/${data._id}`, data
            )
            if (response.data.success) {
                dispatch({ type: 'UPDATE_ORDER', payload: response.data.order })
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }

    const findOrder = orderId => {
        const order = OrderState.orders.find(order => order._id === orderId)
        dispatch({ type: 'FIND_ORDER', payload: order })
    }

    const setItem = itemData => {
        dispatch({ type: 'SET_ITEM', payload: itemData })
    }


    const updateProductWhenOrder = async data => {
        await axios.post(`${apiUrl}/product/updateQuantity`, data)
    }


    const VNPAY = async data => {
        console.log(data)
        const response = await axios.post(`${apiUrl}/vnpay`, data)
        return response.data
    }




    //tContextData
    const cartContextData = { OrderState, getAllOrder, addOrder, deleteOrder, updateOrder, getAll, findOrder, setItem, updateProductWhenOrder, VNPAY }
    return (
        <OrderContext.Provider value={cartContextData}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider