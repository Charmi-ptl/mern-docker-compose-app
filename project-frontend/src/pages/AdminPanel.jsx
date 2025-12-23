import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    developerName: '',
    enrollmentNo: '',
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [page, searchTerm]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/projects', {
        params: { page, search: searchTerm },
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data.projects);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      alert('Error fetching projects');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('You can only upload up to 5 images');
      return;
    }
    setImageFiles(files);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      alert('Title and Description are required');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('link', formData.link);
    data.append('developerName', formData.developerName);
    data.append('enrollmentNo', formData.enrollmentNo);
    imageFiles.forEach((file) => data.append('images', file));

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/projects/${editingId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Project updated');
      } else {
        await axios.post('http://localhost:5000/api/projects', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Project added');
      }

      setFormData({ title: '', description: '', link: '', developerName: '', enrollmentNo: '' });
      setImageFiles([]);
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      alert('Error saving project');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      link: project.link || '',
      developerName: project.developerName || '',
      enrollmentNo: project.enrollmentNo || '',
    });
    setEditingId(project._id);
    setImageFiles([]);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchProjects();
      } catch (err) {
        alert('Error deleting project');
      }
    }
  };

  const prevPage = () => page > 1 && setPage(page - 1);
  const nextPage = () => page < totalPages && setPage(page + 1);

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1 className="admin-title">Admin Panel</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            onLogout();
          }}
          className="logout-btn"
        >
          Logout
        </button>
      </div>

      <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
      <div className="form-section">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Project Title" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Project Description" />
        <input name="link" value={formData.link} onChange={handleChange} placeholder="Project Link" />
        <input name="developerName" value={formData.developerName} onChange={handleChange} placeholder="Developed by" />
        <input name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} placeholder="Enrollment No" />
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        <button onClick={handleSubmit}>{editingId ? 'Update Project' : 'Add Project'}</button>
      </div>

      <hr />

      <div className="project-list">
        <h3>Existing Projects</h3>

        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="search-box"
        />

        {loading && <p>Loading projects...</p>}
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Created At</th>
              <th>Images</th>
              <th>Developer</th>
              <th>Enrollment No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td>{new Date(project.createdAt).toLocaleString()}</td>
                <td>
                  {project.images && project.images.length > 0 ? (
                    <div style={{ display: 'flex', gap: '5px', overflowX: 'auto' }}>
                      {project.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:5000/${img}`}
                          alt={`img-${idx}`}
                          style={{ width: '60px', height: 'auto', borderRadius: '4px' }}
                        />
                      ))}
                    </div>
                  ) : (
                    'No Images'
                  )}
                </td>
                <td>{project.developerName || 'N/A'}</td>
                <td>{project.enrollmentNo || 'N/A'}</td>
                <td>
                  <button onClick={() => handleEdit(project)}>Edit</button>
                  <button onClick={() => handleDelete(project._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={prevPage} disabled={page === 1}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={nextPage} disabled={page === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
