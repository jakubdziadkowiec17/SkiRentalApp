import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate, useParams } from 'react-router-dom';

const EditCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [category, setCategory] = useState({
        id: 0,
        name: '',
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`https://localhost:7076/api/Category/${id}`);
                setCategory(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategory();
    }, [id]);

    const handleInputChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleUpdateCategory = async () => {
        try {
            await axios.put(`https://localhost:7076/api/Category/${id}`, category);
            navigate('/CategoryList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4 mx-auto" style={{ minHeight: '86vh' }}>
                <h1 className="display-7 text-center">Edit Category</h1>
                <hr />
                <div className="row" style={{ margin: '2rem 0' }}>
                    <div className="col-md-4 mx-auto">
                        <div className="form-group">
                            <label className="control-label">Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={category.name}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="text-center" style={{ margin: '2rem 0' }}>
                            <button className="btn btn-success w-100" onClick={handleUpdateCategory}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditCategory;