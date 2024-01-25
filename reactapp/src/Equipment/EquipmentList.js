import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

const EquipmentList = () => {
    const [equipmentList, setEquipmentList] = useState([]);
    const [categoryMap, setCategoryMap] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const equipmentResponse = await axios.get('https://localhost:7076/api/Equipment');
                const categoryResponse = await axios.get('https://localhost:7076/api/Category');

                const categories = categoryResponse.data.reduce((acc, category) => {
                    acc[category.id] = category.name;
                    return acc;
                }, {});

                setEquipmentList(equipmentResponse.data);
                setCategoryMap(categories);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleEditEquipment = (equipmentId) => {
        navigate(`/EditEquipment/${equipmentId}`);
    };

    const handleDeleteEquipment = async (equipmentId) => {
        const shouldDelete = window.confirm('Are you sure you want to delete the specified equipment?');

        if (shouldDelete) {
            try {
                await axios.delete(`https://localhost:7076/api/Equipment/${equipmentId}`);
                const response = await axios.get('https://localhost:7076/api/Equipment');
                setEquipmentList(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCreateEquipment = () => {
        navigate('/CreateEquipment');
    };
    
    const filteredEquipment = equipmentList.filter((equipment) =>
        equipment.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div className="container mt-4" style={{ minHeight: '87vh' }}>
                <h1 className="text-center mb-4">Equipment List</h1>
                <button className="btn btn-primary mb-3" onClick={handleCreateEquipment}>
                    Create
                </button>
                <div className="mb-3">
                    <form>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter id"
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
                            <th scope="col">Series</th>
                            <th scope="col">Size</th>
                            <th scope="col">Color</th>
                            <th scope="col">Price per hour</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEquipment.map((equipment) => (
                            <tr key={equipment.id}>
                                <td>{equipment.id}</td>
                                <td>{equipment.name}</td>
                                <td>{equipment.series}</td>
                                <td>{equipment.size}</td>
                                <td>{equipment.color}</td>
                                <td>{equipment.pricePerHour} zl</td>
                                <td>{categoryMap[equipment.categoryId]}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEditEquipment(equipment.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteEquipment(equipment.id)}
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

export default EquipmentList;