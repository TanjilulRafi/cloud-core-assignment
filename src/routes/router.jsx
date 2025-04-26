import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Home from '../layouts/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    }
])

export default router;