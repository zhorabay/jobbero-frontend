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

  if (loading || !lessons) {
    return <div>Loading...</div>;
  }

  const lesson = lessons.find((lesson) => lesson.id === parseInt(lessonId, 10));

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
              <p className="lesson-description">{lesson.description}</p>
              {lesson.files && lesson.files.map((file) => (
                <div key={file.id}>
                  {file.content_type.startsWith('video') && (
                    <video controls className="lesson-video">
                      <source src={file.url} type={file.content_type} />
                      <track src="track" kind="captions" label="English" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {file.content_type.startsWith('image') && (
                    <img src={file.url} alt="Lesson" className="lesson-image" />
                  )}
                  {['application/pdf',
                    'application/vnd.ms-powerpoint',
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  ].includes(file.content_type) && (
                    <a href={file.url} target="_blank" rel="noopener noreferrer">View Document</a>
                  )}
                </div>
              ))}
              <ul className="cart-list-ul">
                {lesson.comments && lesson.comments.map((comment) => (
                  <li key={comment.id}>{comment}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lessons;
