import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    company: ''
  });
  
  const [userType, setUserType] = useState('jobseeker');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: formData.email,
      password: formData.password,
      role: userType, 
      name: formData.username
    };

    try {
      const response = await fetch('http://localhost:5000/user/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      alert(data.message);


      setErrorMessage(''); 
      setFormData({ username: '', password: '', email: '', company: '' }); 
    } catch (error) {
      setErrorMessage(error.message); 
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register as {userType === 'recruiter' ? 'Recruiter' : 'Job Seeker'}</h2>
      
      <label className="d-block mb-2">Select User Type:</label>
      <div className="user-type-buttons mb-4">
        <button
          type="button"
          className={`btn ${userType === 'jobseeker' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setUserType('jobseeker')}
        >
          Job Seeker
        </button>
        <button
          type="button"
          className={`btn ${userType === 'recruiter' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setUserType('recruiter')}
        >
          Recruiter
        </button>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            <FontAwesomeIcon icon={faUser} /> Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <FontAwesomeIcon icon={faLock} /> Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {userType === 'recruiter' && (
          <div className="mb-3">
            <label htmlFor="company" className="form-label">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              className="form-control"
              placeholder="Enter your company name"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}
