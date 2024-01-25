import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate, useParams } from 'react-router-dom';

const EditEquipment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [equipment, setEquipment] = useState({
        id: '',
        name: '',
        series: '',
        size: 0,
        color: '',
        pricePerHour: 0,
        categoryId: 0,
    });
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axios.get(`https://localhost:7076/api/Equipment/${id}`);
                setEquipment(response.data);
                
                const categoryResponse = await axios.get(`https://localhost:7076/api/Category/${response.data.categoryId}`);
                setCategoryName(categoryResponse.data.name);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEquipment();
    }, [id]);

    const handleInputChange = (e) => {
        setEquipment({ ...equipment, [e.target.name]: e.target.value });
    };

    const handleUpdateEquipment = async () => {
        try {
            await axios.put(`https://localhost:7076/api/Equipment/${id}`, equipment);
            navigate('/EquipmentList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4 mx-auto" style={{ minHeight: '86vh' }}>
                <h1 className="display-7 text-center">Edit Equipment</h1>
                <hr />
                <div className="row" style={{ margin: '2rem 0' }}>
                    <div className="col-md-4 mx-auto">
                        <div className="form-group">
                            <label className="control-label">Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={equipment.name}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Series</label>
                            <input
                                required
                                type="text"
                                name="series"
                                value={equipment.series}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Size</label>
                            <input
                                required
                                type="number"
                                name="size"
                                value={equipment.size}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Color</label>
                            <input
                                required
                                type="text"
                                name="color"
                                value={equipment.color}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Price per hour [zl]</label>
                            <input
                                required
                                type="number"
                                name="pricePerHour"
                                value={equipment.pricePerHour}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Category</label>
                            <input
                                required
                                type="text"
                                name="categoryName"
                                value={categoryName}
                                className="form-control"
                                style={{ backgroundColor: 'lightgray' }}
                                readOnly
                            />
                        </div>
                        <div className="text-center" style={{ margin: '2rem 0' }}>
                            <button className="btn btn-success w-100" onClick={handleUpdateEquipment}>
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

export default EditEquipment;