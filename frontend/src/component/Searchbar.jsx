import React, { useState } from 'react';
import './Searchbar.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/job/search?query=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5000/job/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId }), 
      });

      if (!response.ok) {
        throw new Error('Failed to apply for the job');
      }

      const result = await response.json();
      alert(`Application successful: ${result.message}`); 
    } catch (error) {
      alert(`Error: ${error.message}`); 
    }
  };

  const toggleJobDetails = (jobId) => {
    setSelectedJobId((prevId) => (prevId === jobId ? null : jobId)); 
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search for jobs..."
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {jobs.length > 0 && (
        <ul className="list-group">
          {jobs.map((job) => (
            <li key={job._id} className="list-group-item">
              <h5>{job.title}</h5>
              <p>{job.company}</p>
              <button className="btn btn-info btn-sm" onClick={() => toggleJobDetails(job._id)}>
                {selectedJobId === job._id ? 'Hide Details' : 'View Details'}
              </button>
              <button className="btn btn-success btn-sm ms-2" onClick={() => handleApply(job._id)}>
                Apply
              </button>
              {selectedJobId === job._id && (
                <div className="mt-2">
                  <p><strong>Description:</strong> {job.description}</p>
               
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
