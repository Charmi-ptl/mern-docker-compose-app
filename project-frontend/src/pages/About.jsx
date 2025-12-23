import React from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../assets/about.jpg'; // Ensure the correct image path

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.5, duration: 1.0, ease: 'easeOut' },
  }),
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: 'easeOut' },
  },
};

const colorChange = {
  hidden: { color: '#222' },
  visible: {
    color: '#725CAD',
    transition: { duration: 1.2, ease: 'easeInOut' },
  },
};

const About = () => {
  return (
    <section id="about" style={{ padding: '80px 20px', backgroundColor: '#f9f9f9' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '60px',
          flexWrap: 'wrap',
          padding: '0 20px',
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {/* Left Side: Animated Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={zoomIn}
          style={{
            flex: '1 1 500px',
            textAlign: 'right',
          }}
        >
          <img
            src={aboutImage}
            alt="Students working on projects"
            style={{
              width: '100%',
              maxWidth: '550px',
              height: 'auto',
              maxHeight: '500px',
              borderRadius: '20px',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
              objectFit: 'cover',
            }}
          />
        </motion.div>

        {/* Right Side: Animated Text */}
        <div style={{ flex: '1 1 500px' }}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            style={{
              fontSize: '2.7rem',
              fontWeight: 'bold',
              marginBottom: '25px',
              color: '#222',
            }}
          >
            <motion.span initial="hidden" animate="visible" variants={colorChange}>
              About Our Platform
            </motion.span>
          </motion.h2>

          {[
            'Founded in 2025, our platform was created to provide students with a space to present their work, gain visibility, and inspire others across departments.',
            'Projects come from departments like Computer Science, IT Engineering, and more, showcasing a wide range of skills and ideas.',
            'Each project includes detailed description and image, allowing visitors to fully understand the student’s work.',
          ].map((text, i) => (
            <motion.p
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 1}
              style={{
                fontSize: '1.15rem',
                color: '#555',
                marginBottom: '20px',
                lineHeight: '1.7',
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
