import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate, useParams } from 'react-router-dom';

const EditRental = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [rental, setRental] = useState({
        id: 0,
        name: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        hours: 0,
        price: 0,
        returned: false,
        rentalDate: new Date(),
        equipmentId: '',
    });

    useEffect(() => {
        const fetchRental = async () => {
            try {
                const response = await axios.get(`https://localhost:7076/api/Rental/${id}`);
                setRental(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRental();
    }, [id]);

    const handleInputChange = (e) => {
        setRental({ ...rental, [e.target.name]: e.target.value });
    };

    const handleUpdateRental = async () => {
        try {
            await axios.put(`https://localhost:7076/api/Rental/${id}`, rental);
            navigate('/RentalList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4 mx-auto" style={{ minHeight: '86vh' }}>
                <h1 className="display-7 text-center">Edit Rental</h1>
                <hr />
                <div className="row" style={{ margin: '2rem 0' }}>
                    <div className="col-md-4 mx-auto">
                        <div className="form-group">
                            <label className="control-label">Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={rental.name}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Last name</label>
                            <input
                                required
                                type="text"
                                name="lastName"
                                value={rental.lastName}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Phone number</label>
                            <input
                                required
                                type="text"
                                name="phoneNumber"
                                value={rental.phoneNumber}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">E-mail</label>
                            <input
                                required
                                type="text"
                                name="email"
                                value={rental.email}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Equipment</label>
                            <input
                                type="text"
                                name="equipmentId"
                                value={rental.equipmentId}
                                onChange={handleInputChange}
                                className="form-control"
                                style={{ backgroundColor: 'lightgray' }}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Hours</label>
                            <input
                                required
                                type="number"
                                name="hours"
                                value={rental.hours}
                                onChange={handleInputChange}
                                className="form-control"
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
                                    id="returned"
                                    checked={rental.returned}
                                    onChange={(e) =>
                                        setRental({
                                            ...rental,
                                            returned: e.target.checked,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Rental date</label>
                            <input
                                required
                                type="datetime-local"
                                name="rentalDate"
                                value={rental.rentalDate}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="text-center" style={{ margin: '2rem 0' }}>
                            <button className="btn btn-success w-100" onClick={handleUpdateRental}>
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

export default EditRental;