import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

const CreateRental = () => {
    const [rentalData, setRentalData] = useState({
        name: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        hours: 0,
        price: 0,
        returned: false,
        rentalDate: new Date().toISOString().split('.')[0],
        equipmentId: '',
    });

    const [equipmentList, setEquipmentList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axios.get('https://localhost:7076/api/equipment');
                setEquipmentList(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEquipment();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7076/api/rental', rentalData);

            setRentalData({
                name: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                hours: 0,
                price: 0,
                returned: false,
                rentalDate: new Date().toISOString().split('.')[0],
                equipmentId: '',
            });

            navigate('/RentalList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4 mx-auto" style={{ minHeight: '86vh' }}>
                <h1 className="display-7 text-center">Create Rental</h1>
                <hr />
                <div className="row" style={{ margin: '2rem 0' }}>
                    <div className="col-md-4 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="control-label">
                                    Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    value={rentalData.name}
                                    onChange={(e) =>
                                        setRentalData({
                                            ...rentalData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="control-label">
                                    Last name
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="lastName"
                                    className="form-control"
                                    value={rentalData.lastName}
                                    onChange={(e) =>
                                        setRentalData({
                                            ...rentalData,
                                            lastName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber" className="control-label">
                                    Phone number
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="phoneNumber"
                                    className="form-control"
                                    value={rentalData.phoneNumber}
                                    onChange={(e) =>
                                        setRentalData({
                                            ...rentalData,
                                            phoneNumber: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="control-label">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    value={rentalData.email}
                                    onChange={(e) =>
                                        setRentalData({
                                            ...rentalData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="equipmentId" className="control-label">
                                    Equipment
                                </label>
                                <select
                                    id="equipmentId"
                                    className="form-select"
                                    value={rentalData.equipmentId}
                                    onChange={(e) =>
                                        setRentalData({
                                            ...rentalData,
                                            equipmentId: e.target.value,
                                        })
                                    }
                                    required
                                >
                                    <option value="">Select equipment</option>
                                    {equipmentList.map((equipment) => (
                                        <option key={equipment.id} value={equipment.id}>
                                            {equipment.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="hours" className="control-label">
                                    Hours
                                </label>
                                <input
                                    required
                                    type="number"
                                    id="hours"
                                    className="form-control"
                                    value={rentalData.hours}
                                    onChange={(e) =>
                                        setRentalData({
                                            ...rentalData,
                                            hours: parseInt(e.target.value, 10),
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="returned" className="control-label">
                                    Returned
                                </label>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckDefault"
                                        checked={rentalData.returned}
                                        onChange={(e) =>
                                            setRentalData({
                                                ...rentalData,
                                                returned: e.target.checked,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="rentalDate" className="control-label">
                                    Rental date
                                </label>
                                <input
                                    required
                                    type="datetime-local"
                                    id="rentalDate"
                                    className="form-control"
                                    value={rentalData.rentalDate}
                                    onChange={(e) =>
                                        setRentalData({
                                            ...rentalData,
                                            rentalDate: e.target.value,
                                        })
                                    }
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

export default CreateRental;