import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AddJob = () => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: '',
    link: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://job-tracker-backend-txxz.onrender.com', formData);
      console.log('Job added:', response.data);
      alert('Job added successfully');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert('Error adding job');
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '40px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Job</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="company"
          placeholder="🏢 Company"
          value={formData.company}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="role"
          placeholder="👨‍💻 Role"
          value={formData.role}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="Applied">📤 Applied</option>
          <option value="Interview">🤝 Interview</option>
          <option value="Offer">💼 Offer</option>
          <option value="Rejected">❌ Rejected</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="link"
          placeholder="🔗 Job Link"
          value={formData.link}
          onChange={handleChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>➕ Add Job</button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/all-jobs" style={{ color: '#007bff', textDecoration: 'none' }}>📋 View All Jobs</Link>
      </div>
    </div>
  );
};

// Style objects
const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px'
};

const buttonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer'
};

export default AddJob;
