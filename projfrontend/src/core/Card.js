import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f, // function(f) { return f }
    reload = undefined }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const cartTitle = product ? product.name : 'Photo from pexels';
    const cartDescription = product ? product.description : 'Default Description';
    const cartPrice = product ? product.price : 'Default Price';

    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true));
    }

    const getARedirect = (redirect) => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const showAddToCart = (addtoCart) => {
        return (
            addtoCart && (
                <div className="addCart" title="Add to Cart" onClick={addToCart}>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </div>
            )
        );
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button className="btn btn-danger rounded mt-2" onClick={() => {
                    removeItemFromCart(product._id);
                    setReload(!reload);
                }}>Remove from cart</button>
            )
        );
    }

    return (
        <>
            <div className="section products" id="latestProducts">
                <div className="product-layout rounded">
                    <div className="product rounded">
                        <div className="img-container">
                            {getARedirect(redirect)}
                            <ImageHelper product={product} />
                            {showAddToCart(addtoCart)}
                        </div>
                        <div className="bottom bg-white">
                            <h2>
                                <a href="/">{cartTitle}</a>
                            </h2>
                            <p style={{ fontSize: '14px' }}>{cartDescription}</p>
                            <div className="price">
                                <span>${cartPrice}</span>
                            </div>
                            {showRemoveFromCart(removeFromCart)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
