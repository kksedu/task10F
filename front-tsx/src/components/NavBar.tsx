import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav style={{ background: '#333', padding: '1rem' }}>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around' }}>
        <li><Link to="/" style={{ color: 'white' }}>Home</Link></li>
        <li><Link to="/products" style={{ color: 'white' }}>Products</Link></li>
        <li><Link to="/cart" style={{ color: 'white' }}>Cart</Link></li>
        <li><Link to="/payments" style={{ color: 'white' }}>Payments</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
