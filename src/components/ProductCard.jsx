import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    console.log(product.length);
    return (
        <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="card bg-base-100 shadow-sm">
                <figure className="h-52 overflow-hidden">
                    <img
                        src={`https://admin.refabry.com/storage/product/${product.image}`}
                        alt={product.name}
                        className="object-cover w-full h-full"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.short_desc.slice(0, 150)}...{" "}</p>
                    <p><b>Price:</b> {product.price} Tk</p>
                    <div className="card-action flex justify-between items-center">
                        <Link to={`/product/${product.id}`} className="btn btn-primary mt-2">Details</Link>
                        <Link to={`/order/${product.id}`} className="btn btn-primary mt-2">Buy Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
