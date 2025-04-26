import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        fetch('https://admin.refabry.com/api/all/product/get')
            .then(res => res.json())
            .then(data => {
                console.log('Fetched data:', data.data.data); 
                setProducts(data.data.data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Home;
