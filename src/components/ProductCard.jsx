import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    console.log(product.length);
    return (
        <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <figure className="h-48 overflow-hidden">
                <img
                    src={`https://admin.refabry.com/storage/product/${product.image}`}
                    alt={product.name}
                    className="object-cover w-full h-full"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg">{product.name}</h2>
                <p className="text-gray-700">Price: {product.price} Tk</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary mt-4">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
