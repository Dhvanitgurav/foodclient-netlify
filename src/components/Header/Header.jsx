import React from "react";
import { Link } from "react-router-dom";// replace with your food image
import "./Header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="hero-section">
      <img src={assets.background} alt="Delicious Food" className="hero-image" />
      <div className="hero-text">
        <h1>Order your favorite food here</h1>
        <p>Discover the best food and drinks in Sangli</p>
        <Link to="/explore" className="btn btn-primary"style={{ backgroundColor: '#FF7F50', borderColor: '#FF7F50', color: 'white' }}



>
          Explore
        </Link>
      </div>
    </div>
  );
};

export default Header;
