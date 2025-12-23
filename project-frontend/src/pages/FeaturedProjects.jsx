import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        setProjects(res.data.projects.slice(0, 3));
      })
      .catch(err => console.error('Error fetching featured projects:', err));
  }, []);

  return (
    <div className="featured-container">
      <h2 className="featured-title">Projects</h2>
      <div className="featured-grid">
        {projects.map((project) => {
          const imagePath = project.images && project.images.length > 0
            ? `http://localhost:5000${project.images[0].startsWith('/') ? '' : '/'}${project.images[0]}?t=${new Date().getTime()}`
            : null;

          return (
            <div 
              key={project._id} 
              className="featured-card" 
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <h3>{project.title}</h3>
              <p>{project.description?.substring(0, 100)}...</p>
              <p><strong>By:</strong> {project.developerName || 'Unknown'}</p>
              <p><strong>Enroll:</strong> {project.enrollmentNo || 'N/A'}</p>
              
              {imagePath && (
                <img 
                  src={imagePath} 
                  alt={project.title} 
                  className="featured-image" 
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProjects;
