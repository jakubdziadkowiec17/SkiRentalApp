import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';

import CategoryList from './Category/CategoryList';
import CreateCategory from './Category/CreateCategory';
import EditCategory from './Category/EditCategory';

import EquipmentList from './Equipment/EquipmentList';
import CreateEquipment from './Equipment/CreateEquipment';
import EditEquipment from './Equipment/EditEquipment';

import RentalList from './Rental/RentalList';
import CreateRental from './Rental/CreateRental';
import EditRental from './Rental/EditRental';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route path="/CategoryList" element={<CategoryList />} />
                    <Route path="/CreateCategory" element={<CreateCategory />} />
                    <Route path="/EditCategory/:id" element={<EditCategory />} />

                    <Route path="/EquipmentList" element={<EquipmentList />} />
                    <Route path="/CreateEquipment" element={<CreateEquipment />} />
                    <Route path="/EditEquipment/:id" element={<EditEquipment />} />

                    <Route path="/RentalList" element={<RentalList />} />
                    <Route path="/CreateRental" element={<CreateRental />} />
                    <Route path="/EditRental/:id" element={<EditRental />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;