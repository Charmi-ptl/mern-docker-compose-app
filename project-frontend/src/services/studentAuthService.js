import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/students'; // Change if deployed

export const registerStudent = async (data) => {
  const res = await axios.post(`${API_BASE}/register`, data);
  return res.data;
};

export const loginStudent = async (data) => {
  const res = await axios.post(`${API_BASE}/login`, data);
  return res.data;
};
