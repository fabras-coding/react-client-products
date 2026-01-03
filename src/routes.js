import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Products from './pages/products';
import NewProduct from './pages/new-product';

export default function AppRoutes(){
    return (
       <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/new" element={<NewProduct />} />
            </Routes>
        </BrowserRouter>
    );
}