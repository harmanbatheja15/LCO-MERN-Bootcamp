import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';
import Base from '../core/Base';

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });

    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, name: "", email: "", password: "", error: "", success: true });
            }
        }).catch(console.log("Error in Signup!"));
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" onChange={handleChange("name")} value={name} id="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" onChange={handleChange("email")} value={email} id="email" aria-describedby="emailHelp" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" onChange={handleChange("password")} value={password} id="password" />
                        </div>
                        <button type="submit" onClick={onSubmit} className="btn btn-success rounded mt-2">Submit</button>
                    </form>
                </div>
            </div>
        );
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
                        New account was created successfully. Please <Link to="/signin">Login</Link> to continue.
                    </div>
                </div>
            </div>
        );
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Base title="Signup Page" description="A page for user to signup!">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>
    );
}

export default Signup;
