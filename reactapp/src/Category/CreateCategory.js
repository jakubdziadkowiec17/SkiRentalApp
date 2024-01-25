import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7076/api/Category', { Name: categoryName });
            setCategoryName('');
            navigate('/CategoryList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4 mx-auto" style={{ minHeight: '86vh' }}>
                <h1 className="display-7 text-center">Create Category</h1>
                <hr />
                <div className="row" style={{ margin: '2rem 0' }}>
                    <div className="col-md-4 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="categoryName" className="control-label">
                                    Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="categoryName"
                                    className="form-control"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                            </div>
                            <div className="text-center" style={{ margin: '2rem 0' }}>
                                <button className="btn btn-success w-100">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateCategory;