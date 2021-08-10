import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({ product }) => {

    const imageUrl = product ? `${API}/product/photo/${product._id}` : 'https://harmanbatheja15.github.io/EcommerceWebsite/images/product1.jpg'

    return (
        <>
            <img src={imageUrl} alt="Product" className="rounded" />
        </>
    );
}

export default ImageHelper;
