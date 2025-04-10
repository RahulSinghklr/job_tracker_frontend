import React, { useState } from 'react';
import axios from 'axios';

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: '',
    link: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', formData);
      alert('Job added successfully!');
      setFormData({ company: '', role: '', status: 'Applied', date: '', link: '' });
    } catch (err) {
      console.error(err);
      alert('Error adding job');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" required />
      <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" required />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input name="link" value={formData.link} onChange={handleChange} placeholder="Job Link" />
      <button type="submit">Add Job</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '20px auto',
    gap: '10px',
  },
};

export default AddJobForm;
