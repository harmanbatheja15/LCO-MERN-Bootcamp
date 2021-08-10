import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import Paymentb from './Paymentb';

const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <div>
                {products.map((product, index) => (
                    <Card key={index} product={product} addtoCart={false} removeFromCart={true} setReload={setReload} reload={reload} />
                ))}
            </div>
        );
    }

    const loadCheckout = () => {
        return (
            <div>
                <h2>This section is for checkout</h2>
            </div>
        );
    }

    return (
        <Base title="Cart Page" description="Ready To Checkout">
            <div className="row text-center">
                <div className="col-4">
                    {products.length > 0 ? (
                        loadAllProducts(products)
                    ) : (
                        <h4>No products in cart!</h4>
                    )}
                </div>
                <div className="col-8">
                    <Paymentb products={products} setReload={setReload} />
                </div>
            </div>
        </Base>
    );
}

export default Cart;
