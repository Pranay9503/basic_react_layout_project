import React from "react";
import Header from "./components/Header";
import Protected from "./components/Protected";
import Home from "./components/Home";
import Products from "./components/Products";
import Signin from "./components/Signin";
import store from "./table/store";
import RO from "./components/RO";
// import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Warehouse from "./components/Warehouse";
import UserDetails from "./components/Users";
import { Provider } from "react-redux";

function App() {
    return (
        <Provider store={store}>
        <BrowserRouter>
            {/* <Header /> */}
            <Routes>
                <Route path="/" element={<Protected Comp={Home}/>} />
                <Route path="/products" element={<Protected Comp={UserDetails}/>} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/warehouse" element={<Warehouse />} />
                <Route path="/RO" element={<RO />} />
                {/* <Route path="/signup" element={<Signup />} /> */}
            </Routes>
        </BrowserRouter>
        </Provider>
    );
}

export default App;