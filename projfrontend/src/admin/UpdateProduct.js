import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getCategories, getProduct, updateProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

const UpdateProduct = ({ match }) => {

    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: "",
    });

    const { name, description, price, stock, categories, loading, error, createdProduct, getaRedirect, formData } = values;

    const preload = (productId) => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                preloadCategories()
                setValues({ ...values, name: data.name, description: data.description, price: data.price, stock: data.stock, category: data.category._id, formData: new FormData() });
            }

        });
    }

    const preloadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ categories: data, formData: new FormData() });
            }
        })
    }

    useEffect(() => {
        preload(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateProduct(match.params.productId, user._id, token, formData).then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, name: "", description: "", price: "", stock: "", photo: "", loading: false, createdProduct: data.name });
                setTimeout(function () {
                    setValues({ getaRedirect: true });
                }, 3000);
            }

        });
    }

    const performRedirect = () => {
        if (getaRedirect) {
            return <Redirect to="/admin/products" />
        }
    }
    
    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info mt-4" role="alert">
                    <b>Loading...</b>
                </div>
            )
        );
    }

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-4" role="alert" style={{ display: createdProduct ? "" : "none" }}>
                <b>{createdProduct}</b> Updated successfully!
            </div>
        );
    }

    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-4" role="alert" style={{ display: error ? "" : "none" }}>
                {error}
            </div>
        );
    }

    const createProductForm = () => {
        return (
            <form className="mt-3 mb-3">
                <span>Post photo</span>
                <div className="form-group mt-2">
                    <label>
                        <input type="file" name="photo" accept="image" onChange={handleChange("photo")} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input name="photo" placeholder="Name" value={name} className="form-control" onChange={handleChange("name")} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="photo" placeholder="Description" value={description} className="form-control" onChange={handleChange("description")} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">$</div>
                        </div>
                        <input type="number" className="form-control" value={price} onChange={handleChange("price")} id="inlineFormInputGroup" placeholder="Price" />
                    </div>
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select placeholder="Category" className="form-control" onChange={handleChange("category")}>
                        <option>Select</option>
                        {categories && (
                            categories.map((cate, index) => (
                                <option value={cate._id} key={index}>{cate.name}</option>
                            ))
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input type="number" placeholder="Stock" value={stock} className="form-control" onChange={handleChange("stock")} />
                </div>

                <button type="submit" onClick={onSubmit} className="btn btn-outline-success my-1 rounded">
                    Update Product
                </button>
            </form>
        );
    }

    return (
        <Base title="Add Product Here" description="Welcome to create product section" className="container bg-info p-4 mb-5">

            <Link to="/admin/products" className="btn btn-md btn-dark mb-3 rounded">{'<'} Back</Link>

            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {loadingMessage()}
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                    {performRedirect()}
                </div>

            </div>
        </Base>
    );
}

export default UpdateProduct;
