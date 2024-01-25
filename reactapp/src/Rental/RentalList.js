import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

const RentalList = () => {
    const [rentals, setRentals] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredRentals = rentals.filter((rental) =>
        rental.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7076/api/Rental');
                setRentals(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleEditRental = (rentalId) => {
        navigate(`/EditRental/${rentalId}`);
    };

    const handleDeleteRental = async (rentalId) => {
        const shouldDelete = window.confirm('Are you sure you want to delete the specified record?');

        if (shouldDelete) {
            try {
                await axios.delete(`https://localhost:7076/api/Rental/${rentalId}`);
                const response = await axios.get('https://localhost:7076/api/Rental');
                setRentals(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCreateRental = () => {
        navigate('/CreateRental');
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4" style={{ minHeight: '87vh' }}>
                <h1 className="text-center mb-4">Rental List</h1>
                <button className="btn btn-primary mb-3" onClick={handleCreateRental}>
                    Create
                </button>
                <div className="mb-3">
                    <form>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter last name"
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
                            <th scope="col">Last name</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Equipment</th>
                            <th scope="col">Hours</th>
                            <th scope="col">Price</th>
                            <th scope="col">Returned</th>
                            <th scope="col">Rental date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRentals.map((rental) => (
                            <tr key={rental.id}>
                                <td>{rental.id}</td>
                                <td>{rental.name}</td>
                                <td>{rental.lastName}</td>
                                <td>{rental.phoneNumber}</td>
                                <td>{rental.email}</td>
                                <td>{rental.equipmentId}</td>
                                <td>{rental.hours}</td>
                                <td>{rental.price} zl</td>
                                <td>{rental.returned ? 'Yes' : 'No'}</td>
                                <td>{new Date(rental.rentalDate).toLocaleString()}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEditRental(rental.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteRental(rental.id)}
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

export default RentalList;