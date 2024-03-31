// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/Home.css';

const Homepage = () =>
// const [hotelItems, setHotelItems] = useState([]);
// const [isMenuOpen, setMenuOpen] = useState(true);

  // const toggleMenu = () => {
  //   setMenuOpen(!isMenuOpen);
  // };
  // useEffect(() => {
  //   const fetchHotelItems = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/api/v1/items');
  //       setHotelItems(response.data.items);
  //     } catch (error) {
  //       console.error('Error fetching hotel items:', error);
  //     }
  //   };
  //   fetchHotelItems();
  // }, []);
  (
    <>
      <div className="homepage-container">
        <div className="home-text">
          <div className="home-title">
            <h1 className="home-h1">Discover Your Potential:</h1>
            <p className="home-p">
              Acquire In-Demand
              <span className="white">
                Skills
              </span>
              and Land Your Dream
              <span className="white">
                Career
              </span>
              Today!
            </p>
          </div>
          <div className="home-form">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search courses, instructors..."
                className="me-2 search-form"
                aria-label="Search"
              />
              <Button type="button" className="home-search-btn">Search</Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
export default Homepage;
