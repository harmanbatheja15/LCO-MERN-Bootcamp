import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getCategories, deleteCategory } from './helper/adminapicall';

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);
    const { user, token } = isAuthenticated();

    const preload = () => {
        getCategories(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        });
    }

    useEffect(() => {
        preload();
    }, []);

    const deleteThisCategory = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        })
    }

    return (
        <Base title="Welcome Admin" description="Manage Categories here">

            <Link className="btn btn-info rounded" to={`/admin/dashboard`}>
                <span>{'<'} Admin Home</span>
            </Link>

            <h2 className="my-5">All categories :</h2>

            <div className="row">
                <div className="col-12">

                    {categories.map((category, index) => (
                        <>
                            <div key={index} className="row text-center mb-3">
                                <div className="col-10">
                                    <h3 className="text-white text-left"> <span className="mr-3">{index + 1} :</span> {category.name}</h3>
                                </div>
                                <div className="col-2">
                                    <button onClick={() => deleteThisCategory(category._id)} className="btn btn-danger rounded">
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

export default ManageCategories;
