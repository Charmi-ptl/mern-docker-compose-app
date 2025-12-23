import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section style={{ position: 'relative', textAlign: 'center', padding: '150px 20px', color: '#fff', marginTop: '73px' }}>
      <video
        style={{ position: 'absolute', top: 10, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }}
        autoPlay loop muted playsInline src="/videos/student-project.mp4"
      />
      <div style={{ fontFamily: 'Playfair Display, serif', position: 'relative', zIndex: 1, fontSize: 18 }}>
        <h1 data-aos="fade-up">Explore Innovative Student Projects</h1>
        <p data-aos="fade-up" data-aos-delay="100">Built by students.</p>
      </div>
    </section>
  );
};

export default Hero;
