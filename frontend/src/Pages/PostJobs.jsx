import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PostJobs({ onJobPost }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    salary: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/job/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newJob = await response.json();
        if (onJobPost) {
          onJobPost(newJob);
        }

        setFormData({ title: '', company: '', description: '', salary: '' });
        setSuccess('Job posted successfully!');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.error('Error posting job:', errorMessage);
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Post a Job</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="w-75 mx-auto p-4 border rounded">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the job title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company Name</label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Enter the company name"
            value={formData.company}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Job Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a brief description of the job"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            placeholder="Enter salary"
            value={formData.salary}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Post Job</button>
      </form>
    </div>
  );
}
