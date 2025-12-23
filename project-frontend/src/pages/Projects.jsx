import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data.projects))
      .catch(err => console.error(err));
  }, []);

  const handleProjectClick = (projectId) => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/projects/${projectId}`)
      .then(res => {
        setSelectedProject(res.data);
        setCurrentImageIndex(0);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  // Auto-scroll effect for image carousel
  useEffect(() => {
    if (!selectedProject) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        (prev + 1) % selectedProject.images.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedProject]);

  if (loading) return <div>Loading...</div>;

  if (selectedProject) {
    const imageSrc =
      selectedProject.images.length > 0
        ? `http://localhost:5000${
            selectedProject.images[currentImageIndex].startsWith('/')
              ? ''
              : '/'
          }${selectedProject.images[currentImageIndex]}`
        : null;

    return (
      <div className="project-detail-card">
        {imageSrc && (
          <div className="carousel-wrapper">
            <button
              onClick={handleBack}
              className="back-button back-button-absolute"
            >
              Back to Projects
            </button>

            <img
              src={imageSrc}
              alt={`Screenshot ${currentImageIndex + 1}`}
              className="carousel-image"
              onClick={() => window.open(selectedProject.link, '_blank')}
            />

            <div className="dot-indicators">
              {selectedProject.images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${
                    index === currentImageIndex ? 'active' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  ●
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="project-info">
          <h2>{selectedProject.title}</h2>
          <p>{selectedProject.description}</p>
          <p>
            <strong>Developed by:</strong>{' '}
            {selectedProject.developerName || 'Unknown'}
          </p>
          <p>
            <strong>Enrollment No:</strong>{' '}
            {selectedProject.enrollmentNo || 'N/A'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <h1 className="projects-title">All Projects</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project._id}
            className="project-card"
            onClick={() => handleProjectClick(project._id)}
          >
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description.substring(0, 100)}...</p>
              <p>
                <strong>By:</strong> {project.developerName || 'Unknown'}
              </p>
              <p>
                <strong>Enroll:</strong> {project.enrollmentNo || 'N/A'}
              </p>
            </div>
            {project.images && project.images.length > 0 && (
              <img
                src={`http://localhost:5000${
                  project.images[0].startsWith('/') ? '' : '/'
                }${project.images[0]}`}
                alt={project.title}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
