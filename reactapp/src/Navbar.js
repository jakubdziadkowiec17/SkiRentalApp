import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigate = async (path) => {
            navigate(path);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom box-shadow">
            <div className="container-fluid" style={{ padding: '0 1.5rem' }}>
                <a className="navbar-brand" href="" onClick={() => handleNavigate('/')}>SkiRentalApp</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
                <li className="nav-item">
                            <a className="nav-link" style={{ color: 'black' }}  href="" onClick={() => handleNavigate('/')}>Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="" onClick={() => handleNavigate('/RentalList')} style={{ color: 'black' }}>Rentals</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="" onClick={() => handleNavigate('/EquipmentList')} style={{ color: 'black' }}>Equipment</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="" onClick={() => handleNavigate('/CategoryList')} style={{ color: 'black' }}>Categories</a>
                </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;