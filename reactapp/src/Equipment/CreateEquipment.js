import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

const CreateEquipment = () => {
    const [equipmentData, setEquipmentData] = useState({
        id: '',
        name: '',
        series: '',
        size: 0,
        color: '',
        pricePerHour: 0,
        categoryId: 0,
    });

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://localhost:7076/api/category');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7076/api/equipment', equipmentData);

            setEquipmentData({
                id: '',
                name: '',
                series: '',
                size: 0,
                color: '',
                pricePerHour: 0,
                categoryId: 0,
            });

            navigate('/EquipmentList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4 mx-auto" style={{ minHeight: '86vh' }}>
                <h1 className="display-7 text-center">Create Equipment</h1>
                <hr />
                <div className="row" style={{ margin: '2rem 0' }}>
                    <div className="col-md-4 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="equipmentId" className="control-label">
                                    Id
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="equipmentId"
                                    className="form-control"
                                    value={equipmentData.id}
                                    onChange={(e) =>
                                        setEquipmentData({
                                            ...equipmentData,
                                            id: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="equipmentName" className="control-label">
                                    Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="equipmentName"
                                    className="form-control"
                                    value={equipmentData.name}
                                    onChange={(e) =>
                                        setEquipmentData({
                                            ...equipmentData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="equipmentSeries" className="control-label">
                                    Series
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="equipmentSeries"
                                    className="form-control"
                                    value={equipmentData.series}
                                    onChange={(e) =>
                                        setEquipmentData({
                                            ...equipmentData,
                                            series: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="equipmentSize" className="control-label">
                                    Size
                                </label>
                                <input
                                    required
                                    type="number"
                                    id="equipmentSize"
                                    className="form-control"
                                    value={equipmentData.size}
                                    onChange={(e) =>
                                        setEquipmentData({
                                            ...equipmentData,
                                            size: parseInt(e.target.value, 10),
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="equipmentColor" className="control-label">
                                    Color
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="equipmentColor"
                                    className="form-control"
                                    value={equipmentData.color}
                                    onChange={(e) =>
                                        setEquipmentData({
                                            ...equipmentData,
                                            color: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="equipmentPricePerHour" className="control-label">
                                    Price per hour [zl]
                                </label>
                                <input
                                    required
                                    type="number"
                                    id="equipmentPricePerHour"
                                    className="form-control"
                                    value={equipmentData.pricePerHour}
                                    onChange={(e) =>
                                        setEquipmentData({
                                            ...equipmentData,
                                            pricePerHour: parseInt(e.target.value, 10),
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="equipmentCategoryId" className="control-label">
                                    Category
                                </label>
                                <select
                                    id="equipmentCategoryId"
                                    className="form-select"
                                    value={equipmentData.categoryId}
                                    onChange={(e) =>
                                        setEquipmentData({
                                            ...equipmentData,
                                            categoryId: parseInt(e.target.value, 10),
                                        })
                                    }
                                >
                                    <option value={0}>Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
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

export default CreateEquipment;