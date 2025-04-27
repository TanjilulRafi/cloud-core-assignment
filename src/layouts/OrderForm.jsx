import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

function OrderForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [formData, setFormData] = useState({
        c_name: '',
        c_phone: '',
        address: '',
    });
    const [message, setMessage] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        fetch('https://admin.refabry.com/api/all/product/get')
            .then(res => res.json())
            .then(data => {
                const foundProduct = data.data.data.find(p => p.id == id);
                setProduct(foundProduct);
            })
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleQuantityChange = (e) => {
        const qty = parseInt(e.target.value) || 1;
        setQuantity(qty);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product) return;
        const codAmount = (product.price * quantity) + 80;
        const body = {
            product_ids: product.id.toString(),
            s_product_qty: quantity.toString(),
            c_phone: formData.c_phone,
            c_name: formData.c_name,
            courier: 'steadfast',
            address: formData.address,
            advance: null,
            cod_amount: codAmount.toString(),
            discount_amount: null,
            delivery_charge: "80",
        };
        try {
            const response = await axios.post('https://admin.refabry.com/api/public/order/create', body);
            setMessage('Order placed successfully!');
            setOrderPlaced(true);
        } catch (error) {
            setMessage('Failed to place order.');
        }
    };

    const handleReturnHome = () => {
        navigate('/');
    };

    if (!product) return <Loading />;

    const netPayable = (product.price * quantity) + 80;

    return (
        <div className="mx-auto p-6 bg-base-200 rounded-xl">
            {orderPlaced ? (
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-green-600">{message}</h1>
                    <button onClick={handleReturnHome} className="btn btn-primary">
                        Return Home
                    </button>
                </div>
            ) : (
                <>
                    <div className="hero bg-base-200">
                        <div className="hero-content flex-col lg:flex-row w-full">
                            <div className="lg:w-1/3 w-full flex justify-center">
                                <figure className="w-full h-3/2 overflow-hidden">
                                    <img
                                        src={`https://admin.refabry.com/storage/product/${product.image}`}
                                        alt={product.name}
                                        className="object-cover w-full h-full rounded-xl"
                                    />
                                </figure>
                            </div>
                            <div className="lg:w-1/3 w-full p-8">
                                <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>
                                {message && <div className="alert alert-info mb-4">{message}</div>}
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold">{product.name}</h2>
                                    <p>Price: {product.price} Tk</p>
                                    <p>Delivery Charge: 80 Tk</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Quantity"
                                        className="input input-bordered w-full"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                        required
                                    />
                                    <p className="font-semibold">Net Payable: {netPayable} Tk</p>

                                    <input
                                        type="text"
                                        name="c_name"
                                        placeholder="Name"
                                        className="input input-bordered w-full"
                                        value={formData.c_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="c_phone"
                                        placeholder="Phone"
                                        className="input input-bordered w-full"
                                        value={formData.c_phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        className="input input-bordered w-full"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <button type="submit" className="btn btn-primary w-full">
                                        Place Order
                                    </button>
                                    <Link to="/" className="btn btn-primary w-full mt-2">
                                        Home
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default OrderForm;
