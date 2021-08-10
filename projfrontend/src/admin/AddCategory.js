import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [values, setValues] = useState({
        loading: false,
        getaRedirect: false,
    });

    const { loading, getaRedirect } = values;
    const { user, token } = isAuthenticated();

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        // Backend request fired
        createCategory(user._id, token, { name }).then(data => {

            if (data.error) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
                setName("");
                setValues({ ...values, loading: false });
                setTimeout(function () {
                    setValues({ getaRedirect: true });
                }, 2000);
            }

        });

    }

    const performRedirect = () => {
        if (getaRedirect) {
            return <Redirect to="/admin/categories" />
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
            <div className="alert alert-success mt-3" role="alert" style={{ display: success ? "" : "none" }}>
                Category Created Successfully!
            </div>
        );
    }

    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-3" role="alert" style={{ display: error ? "" : "none" }}>
                Failed to create category!
            </div>
        );
    }

    const myCategoryForm = () => {
        return (
            <form className="mt-3 mb-3">
                <div className="form-group">
                    <input type="text" placeholder="Ex. Summer" autoFocus value={name} className="form-control" onChange={handleChange} />
                </div>
                <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
                    Create Category
                </button>
            </form>
        );
    }

    return (
        <Base title="Create a category here" description="Add a new category for tshirts" className="container bg-info p-4">

            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3 rounded">{'<'} Admin Home</Link>

            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2 p-3">
                    {loadingMessage()}
                    {successMessage()}
                    {errorMessage()}
                    {myCategoryForm()}
                    {performRedirect()}
                </div>
            </div>

        </Base>
    );
}

export default AddCategory;
