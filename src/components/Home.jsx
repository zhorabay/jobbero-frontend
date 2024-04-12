import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation1 from './Navigation1';
import Navigation from './Navigation';
import Infograph from './Infograph';
import CategoryCarousel from './Carousel';
import '../styles/Home.css';
import Prospects from './Prospects';
import Vision from './Vision';
import FeaturedCourses from './FeaturedCourses';
import ExpertTutors from './ExpertTutors';
import Invitation from './Invitation';
import Partners from './Partners';
import Footer from './Footer';
import { searchInstructorsAndCourses } from '../redux/actions/searchActions';

function Homepage() {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const searchResults = useSelector((state) => state.search.results);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        setLoading(true);
        dispatch(searchInstructorsAndCourses(searchQuery));
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchQuery, dispatch]);

  useEffect(() => {
    console.log("Search results:", searchResults);
  }, [searchResults]);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navigation1 userId={userId ? userId.toString() : ''} />
      <Navigation />
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
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button type="button" className="home-search-btn" disabled={loading}>Search</Button>
            </Form>
          </div>
        </div>
      </div>
      <Infograph />
      <Prospects />
      <CategoryCarousel />
      <Vision />
      <FeaturedCourses />
      <ExpertTutors />
      <Invitation />
      <Partners />
      <Footer />

      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <div key={result.id}>
            {result.name}
          </div>
        ))
      ) : (
        <div>No results found</div>
      )}
    </>
  );
}

export default Homepage;
