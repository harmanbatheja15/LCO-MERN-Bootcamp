import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

const Signin = () => {

    const [values, setValues] = useState({
        email: 'harmanbatheja15@gmail.com',
        password: '12345',
        error: '',
        loading: false,
        didRedirect: false,
    });

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({ ...values, didRedirect: true });
                });
            }
        }).catch(console.log("Signin failed!"));
    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" onChange={handleChange('email')} value={email} id="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" onChange={handleChange('password')} value={password} id="password" />
                        </div>
                        <button type="submit" onClick={onSubmit} className="btn btn-success rounded mt-2">Submit</button>
                    </form>
                </div>
            </div>
        );
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <div className="alert alert-info">
                            <b>Loading...</b>
                        </div>
                    </div>
                </div>
            )
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
        <Base title="Signin Page" description="A page for user to signin!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    );
}

export default Signin;
