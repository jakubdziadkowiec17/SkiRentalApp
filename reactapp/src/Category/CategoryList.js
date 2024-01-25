import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7076/api/Category');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleEditCategory = (categoryName) => {
        navigate(`/EditCategory/${categoryName}`);
    };

    const handleDeleteCategory = async (categoryId) => {
        const shouldDelete = window.confirm('Are you sure you want to delete the specified record?');

        if (shouldDelete) {
            try {
                await axios.delete(`https://localhost:7076/api/Category/${categoryId}`);
                const response = await axios.get('https://localhost:7076/api/Category');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCreateCategory = () =>
    {
        navigate('/CreateCategory');
    };
    
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div className="container mt-4" style={{ minHeight: '87vh' }}>
                <h1 className="text-center mb-4">Category List</h1>
                <button className="btn btn-primary mb-3" onClick={handleCreateCategory}>
                    Create
                </button>
                <div className="mb-3">
                    <form>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>
                <div class="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEditCategory(category.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CategoryList;