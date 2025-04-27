import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from './Loading';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch('https://admin.refabry.com/api/all/product/get')
            .then(res => res.json())
            .then(data => {
                const found = data.data.data.find(p => p.id == id);
                setProduct(found);
            });
    }, [id]);

    if (!product) return <Loading/>;

    return (
        
        <div className="card lg:card-side bg-base-100 shadow-sm p-8">
            <figure>
                <img
                    src={`https://admin.refabry.com/storage/product/${product.image}`}
                    alt={product.name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-xl"><b>{product.name}</b></h2>
                <p><b>Description: </b>{product.short_desc}</p>
                <p><b>Regular Price: </b>{product.price}Tk</p>
                <p><b>Discounted: </b>{product.discount_amount}Tk</p>
                <p><b>Discounted Price: </b>{product.price - product.discount_amount}Tk</p>
                <p><b>Available: </b>{product.stock}Pcs</p>
                <div className="card-actions lg:justify-end ">
                    <Link to="/" className="btn btn-primary mt-2">Home</Link>
                    <Link to={`/order/${product.id}`} className="btn btn-primary mt-2">Buy Now</Link>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
