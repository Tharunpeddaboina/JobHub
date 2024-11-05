import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
   
    const searchTerm = localStorage.getItem('searchTerm');
    localStorage.removeItem('searchTerm'); 
    navigate('/home', { state: { searchTerm } });
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form Data:', formData);

    
    handleLogin();
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <div className="form-group">
          <label>Email</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              title="Email"
              placeholder="Enter your email"
              name="username" 
              value={formData.username} 
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLock} />
              </span>
            </div>
            <input
              type="password" 
              className="form-control"
              title="Password"
              placeholder="Enter your password"
              name="password"
              value={formData.password} 
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
      </form>
    </div>
  );
}
