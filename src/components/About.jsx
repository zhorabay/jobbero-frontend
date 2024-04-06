import React from 'react';
import about1 from '../media/about1.png';
import about2 from '../media/about2.png';
import about3 from '../media/about3.png';
import '../styles/About.css';
import Navigation3 from './Navigation3';
import Footer from './Footer';

function About() {
  return (
    <>
      <Navigation3 />
      <div className="about-container">
        <div className="about-section1">
          <h2 className="about-h2">About Us - The Vision</h2>
          <p className="about-p">From Learning to Earning: Origin8Lab&apos;s Journey to Empower Employment Through Skill Development</p>
        </div>
        <div className="about-section2">
          <div className="section2-imgs">
            <img src={about1} alt="EmAboutbgail" className="about-about1" />
            <img src={about2} alt="EmAboutbgail" className="about-about2" />
          </div>
          <div className="section2-texts">
            <h4 className="about-h4">About Us</h4>
            <h3 className="about-h3">Origin8Lab Overview</h3>
            <p className="about-text">Origin8Lab isn&apos;t just a platform—it&apos;s a movement. Born out of a desire to empower individuals with the skills they need to thrive in the digital age, we&apos;re on a mission to redefine the future of work. Our team of experts is dedicated to providing world-class training in tech, personal growth, and business development, equipping you with the tools to excel in any career path you choose.</p>
          </div>
        </div>
        <h2 className="about-section3">
          Let&apos;s Redefine The Boundaries Of
          {' '}
          <span className="white-text">
            What&apos;s Possible
          </span>
        </h2>
        <div className="about-section4">
          <div className="section4-part1">
            <img src={about3} alt="EmAboutbgail" className="about-about3" />
            <div className="section4-texts">
              <h3 className="section4-head">Discover Our Mission and Vision</h3>
              <p className="about-long-text">
                At
                <span className="bold-text">
                  Origin8Lab
                </span>
                , our vision is clear: to ignite a revolution in employability. We believe that everyone deserves the chance to pursue their passions and achieve their dreams. That&apos;s why we&apos;re committed to providing accessible, high-quality training in tech, personal development, and business skills. With our help, you&apos;ll not only land your dream job but also carve out a path to long-term success.
                <br />
                <br />
                1.
                <span className="bold-text">
                  Tech Mastery:
                </span>
                From coding and programming to data analysis and cybersecurity, we empower individuals to become proficient in cutting-edge technologies.
                <br />
                <br />
                2.
                <span className="bold-text">
                  Personal Growth:
                </span>
                Through courses in communication, leadership, and emotional intelligence, we help participants develop the soft skills necessary for personal and professional success.
                <br />
                <br />
                3.
                <span className="bold-text">
                  Business Development:
                </span>
                From entrepreneurship and marketing to finance and project management, we provide the tools and knowledge to navigate the complexities of the modern business environment.
                <br />
                <br />
                4.
                <span className="bold-text">
                  Employability Enhancement:
                </span>
                Through our comprehensive skill acquisition programs, we equip participants with the expertise and confidence needed to stand out to employers and excel in their chosen fields.
                <br />
                <br />
                5.
                <span className="bold-text">
                  Career Empowerment:
                </span>
                By offering practical training and support in tech, personal growth, and business development, we empower our participants to forge rewarding and fulfilling career paths.
              </p>
            </div>
          </div>
          <button type="button" className="about-btn">Start Learning</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
