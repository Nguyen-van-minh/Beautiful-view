import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Routes from './routes/Routes'

const App = () => {
    return (
        <BrowserRouter>
            <Route render={props => (
                <div>
                    {/* <div className="container">
                        <div className="main"> */}
                    <Routes />
                    {/* </div>
                    </div> */}
                </div>
            )} />
        </BrowserRouter>
    )
}

export default App