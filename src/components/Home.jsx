import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Navigation1 from './Navigation1';
import Navigation from './Navigation';
import Infograph from './Infograph';
import CategoryCarousel from './Carousel';
import Prospects from './Prospects';
import Vision from './Vision';
import FeaturedCourses from './FeaturedCourses';
import ExpertTutors from './ExpertTutors';
import Invitation from './Invitation';
import Footer from './Footer';
import { searchInstructorsAndCourses } from '../redux/actions/searchActions';

function Homepage() {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useSelector((state) => state.search.results);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        dispatch(searchInstructorsAndCourses(searchQuery));
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchQuery, dispatch]);

  useEffect(() => {
    console.log('Search results:', searchResults);
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
          <div className="home-form search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search courses, instructors..."
              className="search-input"
            />
            <button type="button" className="home-search-btn" onClick={handleSearchChange}>Search</button>
            <ul className="search-result-container">
              {searchResults.map((result) => (
                <li className="search-result-list" key={result.id}>
                  <Link to={`/${result.id}/modules`}>{result.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Infograph />
      <Prospects />
      <CategoryCarousel />
      <Vision />
      <FeaturedCourses userId={userId} />
      <ExpertTutors />
      <Invitation />
      <hr className="home-hr" />
      <Footer />
    </>
  );
}

export default Homepage;
