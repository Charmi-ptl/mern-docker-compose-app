import React from 'react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{project.title}</h2>
        <div className="modal-image-container">
          <img src={project.image} alt={project.title} />
        </div>
        <p>{project.description}</p>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
            Visit Project
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
