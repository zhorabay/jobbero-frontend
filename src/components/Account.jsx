import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import { fetchCourses } from '../redux/actions/courseActions';
import down from '../media/down.png';
import signin from '../media/sign-blue.png';
import '../styles/Auth.css';
import Navigation3 from './Navigation3';

function Account() {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const signedInUser = useSelector((state) => state.auth.user);
  const courses = useSelector((state) => state.courses.courses);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCourses());
  }, [dispatch]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Navigation3 />
      <div className="account-container">
        <div className="account-flex">
          <div className="account-section1">
            <h2 className="account-h2">Welcome to Origin8Lab Africa, Here is your dashboard</h2>
            <div className="account-section2">
              <div>
                <img src={signedInUser.photo || signin} alt="Profile" className="account-signin" />
                <p className="account-user">{signedInUser.name}</p>
              </div>
            </div>
            <div className="account-section21">
              <div className="account-text">
                <h3 className="account-h3">{signedInUser.courses ? signedInUser.courses.length : 0}</h3>
                <p className="account-p">Courses</p>
              </div>
              <hr className="account-hr" />
              <div className="account-text">
                <h3 className="account-h3">0</h3>
                <p className="account-p">Completed</p>
              </div>
              <hr className="account-hr" />
              <div className="account-text">
                <h3 className="account-h3">0</h3>
                <p className="account-p">Certificate</p>
              </div>
              <hr className="account-hr" />
              <div className="account-text">
                <h3 className="account-h3">0</h3>
                <p className="account-p">Points</p>
              </div>
            </div>
          </div>
          <div className="account-section3">
            <p className="account-courses">Your Courses</p>
            <button type="button" className="account-expand" onClick={toggleExpand}>
              <img src={down} alt="down" className="account-down" />
              Expand All
            </button>
            {isExpanded && courses && Array.isArray(courses) && (
              <div className="account-list">
                {courses.map((course) => (
                  <div key={course.id} className="account-course">
                    <h4 className="account-h4">{course.title}</h4>
                    <ul>
                      {course.course_modules.map((module) => (
                        module.lessons.map((lesson) => (
                          lesson.payment_status === 'paid' && (
                            <li key={lesson.id}>{lesson.title}</li>
                          )
                        ))
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
