import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../layouts/Home';
import OrderForm from '../layouts/OrderForm';
import ProductDetails from '../layouts/ProductDetails';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path:"/product/:id",
        element: <ProductDetails></ProductDetails>
    },
    {
        path: "/order/:id",
        element:<OrderForm></OrderForm>
    }
])

export default router;