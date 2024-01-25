import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleEquipmentList = () => {
        navigate('/EquipmentList');
    };

    return (
        <div>
            <Navbar />
        <div className="container1">
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                    <h1 className="text-center mb-4">Welcome to the home page!</h1>
                    <p className="text-center mb-4">You can start using the system's functionality.</p>
                    <button className="btn btn-primary" onClick={handleEquipmentList}>Go to equipment</button>
            </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;