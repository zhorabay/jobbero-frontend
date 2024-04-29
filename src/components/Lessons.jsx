import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation3 from './Navigation3';
import '../styles/Course.css';
import { fetchLessons } from '../redux/actions/lessonActions';

function Lessons() {
  const navigate = useNavigate();
  const lessons = useSelector((state) => state.lesson.lessons);
  const loading = useSelector((state) => state.lesson.loading);
  const error = useSelector((state) => state.lesson.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const {
    categoryId, courseId, courseModuleId, lessonId,
  } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLessons(categoryId, courseId, courseModuleId, lessonId));
  }, [dispatch, categoryId, courseId, courseModuleId, lessonId]);

  if (!isAuthenticated) {
    navigate('/login');
  }

  if (loading || lessons === null) {
    return <div>Loading...</div>;
  }

  const validLessons = lessons.filter((lesson) => lesson !== null);
  const lesson = validLessons.find((lesson) => lesson.id === parseInt(lessonId, 10));

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  return (
    <>
      <Navigation3 />
      <div className="courses-container">
        <div className="lesson-flex">
          <div className="cart-lists">
            <div key={lesson.id}>
              <h2 className="lesson-h2">{lesson.title}</h2>
              <video controls className="lesson-video">
                <source src={lesson.video} type="video/mp4" />
                <track src="track" kind="captions" label="English" />
                Your browser does not support the video tag.
              </video>
              <p className="lesson-description">{lesson.description}</p>
              <ul className="cart-list-ul">
                <li>{lesson.comments}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lessons;
