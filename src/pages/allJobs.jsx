// AllJobs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL; // 👈 Dynamically use API URL

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/jobs`);
        setJobs(res.data);
        setFilteredJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/jobs/${id}`);
      alert("Job deleted successfully");
      const updatedJobs = jobs.filter((job) => job._id !== id);
      setJobs(updatedJobs);
      applyFilter(statusFilter, updatedJobs);
    } catch (err) {
      console.error("Failed to delete job", err);
      alert("Failed to delete job");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/jobs/${id}`, { status: newStatus });
      const updatedJob = res.data;
      const updatedJobs = jobs.map((job) => (job._id === id ? updatedJob : job));
      setJobs(updatedJobs);
      applyFilter(statusFilter, updatedJobs);
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    }
  };

  const applyFilter = (filter, jobsData = jobs) => {
    if (filter === "All") {
      setFilteredJobs(jobsData);
    } else {
      setFilteredJobs(jobsData.filter((job) => job.status === filter));
    }
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
    applyFilter(selectedStatus);
  };

  const getStatusBadge = (status) => {
    const styles = {
      Applied: { backgroundColor: '#007bff' },
      Interview: { backgroundColor: '#ffc107' },
      Offer: { backgroundColor: '#28a745' },
      Rejected: { backgroundColor: '#dc3545' }
    };
    return (
      <span style={{
        padding: '4px 10px',
        borderRadius: '20px',
        color: 'white',
        fontSize: '14px',
        ...styles[status]
      }}>
        {status}
      </span>
    );
  };

  return (
    <div style={{
      padding: '30px',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#c0c5be',
        fontWeight: '600',
        fontSize: '30px',
        marginBottom: '20px'
      }}>📋 All Jobs</h2>

      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            marginRight: '20px'
          }}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <Link to="/" style={{
          textDecoration: 'none',
          backgroundColor: '#28a745',
          color: 'white',
          padding: '10px 18px',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          ➕ Add New Job
        </Link>
      </div>

      {filteredJobs.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>No jobs found for selected filter.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredJobs.map((job) => (
            <div key={job._id} style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 3px 8px rgba(0,0,0,0.05)',
              backgroundColor: '#fff',
              transition: '0.3s ease-in-out'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ margin: 0, color: '#0056b3' }}>{job.company}</h3>
                {getStatusBadge(job.status)}
              </div>

              <p style={{ margin: '8px 0 4px' }}><strong>Role:</strong> {job.role}</p>
              <p style={{ margin: '4px 0' }}><strong>Date:</strong> {new Date(job.date).toLocaleDateString()}</p>

              {job.link && (
                <p style={{ margin: '6px 0' }}>
                  <a href={job.link} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                    🔗 View Job
                  </a>
                </p>
              )}

              <div style={{ marginTop: '10px', color: 'aquamarine' }}>
                <label htmlFor={`status-${job._id}`} style={{ fontWeight: 'bold' }}>Update Status: </label>
                <select
                  id={`status-${job._id}`}
                  value={job.status}
                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    marginLeft: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <button onClick={() => handleDelete(job._id)} style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '10px',
                fontWeight: 'bold'
              }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
