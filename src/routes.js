import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';

export default function AppRoutes(){
    return (
       <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}