import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';
import Payments from './components/Payments';
import Home from './components/Home';
import './App.css';
import { ContextProvider } from './components/Context';

const App: React.FC = () => {
  return (
    <Router>
      <ContextProvider>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </div>
      </ContextProvider>
    </Router>
  );
};

export default App;
