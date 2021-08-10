import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getProducts, deleteProduct } from './helper/adminapicall';

const ManageProducts = () => {

    const [products, setProducts] = useState([]);
    const { user, token } = isAuthenticated();

    const preload = () => {
        getProducts(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    }

    useEffect(() => {
        preload();
    }, []);

    const deleteThisProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        })
    }

    return (
        <Base title="Welcome Admin" description="Manage products here">

            <Link className="btn btn-info rounded" to={`/admin/dashboard`}>
                <span>{'<'} Admin Home</span>
            </Link>
            
            <h2 className="my-5">All products :</h2>

            <div className="row">
                <div className="col-12">

                    {products.map((product, index) => (
                        <>
                            <div key={index} className="row text-center mb-3">
                                <div className="col-4">
                                    <h3 className="text-white text-left"><span className="mr-4">{index + 1} :</span>{product.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link className="btn btn-success rounded" to={`/admin/product/update/${product._id}`}>
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => deleteThisProduct(product._id)} className="btn btn-danger rounded">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </>
                    ))}

                </div>
            </div>

        </Base>
    );
}

export default ManageProducts;
