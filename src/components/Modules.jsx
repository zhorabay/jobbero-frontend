import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../redux/actions/courseActions';
import { fetchCourseModules } from '../redux/actions/courseModuleActions';
import { fetchReviews } from '../redux/actions/reviewActions';
import down from '../media/down.png';
import downblue from '../media/downblue.png';
import book from '../media/book.png';
import comment from '../media/comment.png';
import '../styles/Course.css';
import Navigation3 from './Navigation3';

function Modules() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const modules = useSelector((state) => state.modules.modules);
  const reviews = useSelector((state) => state.reviews.reviews);

  const [isExpanded, setIsExpanded] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchCourseModules());
    dispatch(fetchReviews());
  }, [dispatch]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
    setShowComments(false);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    setShowDescription(false);
  };

  return (
    <>
      <Navigation3 />
      <div className="modules-container">
        {courses.map((course) => (
          <div className="modules-flex" key={course.id}>
            <h2 className="courses-h2">{course.title}</h2>
            <div className="modules-choose">
              <button type="button" className="modules-choose-t" onClick={toggleDescription}>
                <img src={book} alt="book" className="modules-symbol" />
                Course
              </button>
              <button type="button" className="modules-choose-t" onClick={toggleComments}>
                <img src={comment} alt="comment" className="modules-symbol" />
                Feedback
              </button>
            </div>
            {showDescription && <div className="modules-course-description">{course.about}</div>}
            {showComments && reviews.map((review) => (
              <div key={review.id} className="modules-course-comments">
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
              </div>
            ))}
            <div className="modules-section3">
              <p className="account-courses">Course Content</p>
              <button type="button" className="modules-expand" onClick={toggleExpand}>
                <img src={down} alt="down" className="account-down" />
                Expand All
              </button>
              {isExpanded && modules.map((module) => (
                <div className="modules-list" key={module.id}>
                  <h3>{module.week}</h3>
                  <button type="button" className="account-course-list">
                    <div className="modules-btn-prt1">
                      <h4 className="account-h4">{module.title}</h4>
                      <p className="modules-lessons">
                        {total.lessons}
                        {' '}
                        Topics
                      </p>
                    </div>
                    <button type="button" className="modules-expand-lessons modules-btn-prt2">
                      <img src={downblue} alt="down" className="account-down" />
                      <p className="account-down">Expand</p>
                    </button>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Modules;
