import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './HomePage.css'; 

export default function HomePage({ isLoggedIn }) {
  const navigate = useNavigate();
 
  
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (!isLoggedIn && term) {
      localStorage.setItem('searchTerm', term);
      navigate('/login');
    }
  }, [isLoggedIn, term, navigate]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setTerm(value);
  };

  return (
    <div className="homepage-container">
      <div className="hero-section text-center">
        <h1 className="display-4">
          <i className="fas fa-briefcase"></i> Job Search
        </h1>
        <p className="lead">Discover your next career opportunity</p>
      </div>

      <div className="input-group mb-4 search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search for jobs..."
          value={term}
          onChange={handleSearch}
        />
        <div className="input-group-append">
          <button className="btn btn-primary">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      
      <small className="form-text text-muted text-center">
        {isLoggedIn ? (
          "Start typing to search for jobs."
        ) : (
          <>
            <i className="fas fa-sign-in-alt"></i> Please log in to access job search results.
          </>
        )}
      </small>

      <div className="job-highlights mt-5">
        <h2 className="text-center">Why Choose Us?</h2>
        <div className="row">
          <div className="col-md-4 text-center">
            <i className="fas fa-check-circle highlight-icon"></i>
            <h4>Verified Listings</h4>
            <p>We ensure all job listings are verified for authenticity.</p>
          </div>
          <div className="col-md-4 text-center">
            <i className="fas fa-users highlight-icon"></i>
            <h4>Community Support</h4>
            <p>Join our vibrant community for guidance and support.</p>
          </div>
          <div className="col-md-4 text-center">
            <i className="fas fa-star highlight-icon"></i>
            <h4>Top Companies</h4>
            <p>Explore opportunities with leading companies in your field.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
