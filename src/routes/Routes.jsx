import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from '../pages/customer/Home'
import Users from '../pages/admin/Users'
import ProductDetails from '../pages/customer/ProductDetails'
import Login from '../auth/Login'
import AuthContextProvider from '../contexts/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'
import ProductContextProvider from '../contexts/ProductContext'
import Products from '../pages/admin/Products'
import Categorys from '../pages/admin/Categorys'
import CategoryContextProvider from '../contexts/CategoryContext'
import AddProduct from '../pages/admin/AddProduct'
import ImageContextProvider from '../contexts/ImageContext'
import CartContextProvider from '../contexts/CartContext'
import UserContextProvider from '../contexts/UserContext'
import EditProduct from '../pages/admin/EditProduct'
import Slider from '../pages/admin/Slider'
import SliderContextProvider from '../contexts/SliderContext'
import AddSliderPage from '../pages/admin/AddSlider'
import EditSliderPage from '../pages/admin/EditSlider'
import Catalog from '../pages/customer/Catalog'
import Cart from '../pages/customer/Cart'
import InformationContextProvider from '../contexts/InformationContext'
import Information from '../pages/admin/Information'
import AddInformationPage from '../pages/admin/AddInformationPage'
import EditInfomationPage from '../pages/admin/EditInformationPage'
import Order from '../pages/customer/Order'
import OrderContextProvider from '../contexts/OrderContext'
import AdminOrder from '../pages/admin/AdminOrder'
import AdminOrderDetails from '../pages/admin/AdminOderDatails'
import Personal from '../pages/customer/Personal'
import OrderDetailsCustomer from '../pages/customer/OrderDetailsCustomer'
import OneOrder from '../pages/customer/OneOrder'
import SearchResult from '../pages/customer/SearchResult'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Dashboard from '../pages/admin/Dashboard'
import ReviewContextProvider from '../contexts/ReviewContext'



const Routes = () => {

    return (
        <InformationContextProvider>
            <AuthContextProvider>
                <UserContextProvider>
                    <CategoryContextProvider>
                        <ProductContextProvider>
                            <ImageContextProvider>
                                <SliderContextProvider>
                                    <CartContextProvider>
                                        <PayPalScriptProvider options={{ "client-id": "AbdNkXNjTORHh2E2AMJWc6-ffHFpBNRKP-Hv7SfJuhyACx1XwL7jirmSWpmi_a7KWRcdvhYf_zu_ok4r" }}>
                                            <OrderContextProvider>
                                                <ReviewContextProvider>
                                                    <Switch>
                                                        <Route exact path='/' component={Home} />
                                                        <Route exact path='/catalog' component={Catalog} />
                                                        <Route exact path='/product-details' component={ProductDetails} />
                                                        <Route exact path='/cart' component={Cart} />
                                                        <Route exact path='/order' component={Order} />
                                                        <Route exact path='/oneOrder' component={OneOrder} />
                                                        <Route exact path='/search-result' component={SearchResult} />
                                                        <Route exact path='/personal' component={Personal} />
                                                        <Route exact path='/orderDetailsCustomer' component={OrderDetailsCustomer} />
                                                        <Route exact path='/login' render={props => <Login {...props} authRoute='login' />} />
                                                        <Route exact path='/register' render={props => <Login {...props} authRoute='register' />} />

                                                        <ProtectedRoute exact path='/admin' component={Dashboard} />
                                                        <ProtectedRoute exact path='/admin/user' component={Users} />
                                                        <ProtectedRoute exact path='/admin/category' component={Categorys} />

                                                        <ProtectedRoute exact path='/admin/products' component={Products} />
                                                        <ProtectedRoute exact path='/admin/products/addProduct' component={AddProduct} />
                                                        <ProtectedRoute exact path='/admin/products/editProduct' component={EditProduct} />

                                                        <ProtectedRoute exact path='/admin/information' component={Information} />
                                                        <ProtectedRoute exact path='/admin/information/addInformation' component={AddInformationPage} />
                                                        <ProtectedRoute exact path='/admin/information/editInformation' component={EditInfomationPage} />

                                                        <ProtectedRoute exact path='/admin/slider' component={Slider} />
                                                        <ProtectedRoute exact path='/admin/slider/addSlider' component={AddSliderPage} />
                                                        <ProtectedRoute exact path='/admin/slider/editSlider' component={EditSliderPage} />

                                                        <ProtectedRoute exact path='/admin/order' component={AdminOrder} />
                                                        <ProtectedRoute exact path='/admin/order/order-details' component={AdminOrderDetails} />

                                                        <Route path="/products/:id" component={ProductDetails} />
                                                        <Route path='/login' component={Login} />
                                                    </Switch>
                                                </ReviewContextProvider>


                                            </OrderContextProvider>
                                        </PayPalScriptProvider>
                                    </CartContextProvider>
                                </SliderContextProvider>
                            </ImageContextProvider>
                        </ProductContextProvider>
                    </CategoryContextProvider>
                </UserContextProvider>

                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </AuthContextProvider>
        </InformationContextProvider>
    )
}

export default Routes
