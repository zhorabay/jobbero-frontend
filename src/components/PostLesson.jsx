import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postLesson } from '../redux/actions/lessonActions';
import Navigation3 from './Navigation3';
import '../styles/Post.css';

const PostLesson = () => {
  const { categoryId, courseId, courseModuleId } = useParams();
  const [formData, setFormData] = useState(
    {
      title: '',
      description: '',
      video: null,
    },
  );
  const [formError, setFormError] = useState('');

  const dispatch = useDispatch();
  const error = useSelector((state) => state.lesson.error);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.video) {
      setFormError('Please fill all required fields');
      return;
    }

    if (!formData.video.type.startsWith('video/')) {
      setFormError('Please upload a valid video file');
      return;
    }

    try {
      await dispatch(postLesson(categoryId, courseId, courseModuleId, formData));
      setFormData({ title: '', description: '', video: null });
      setFormError('');
    } catch (error) {
      setFormError('An error occurred while submitting the lesson');
    }

    console.log(formData);
  };

  return (
    <>
      <Navigation3 />
      <div className="post-lesson-container">
        <h2>Add New Lesson</h2>
        <form className="post-lesson-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({
                ...formData,
                title: e.target.value,
              })}
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({
                ...formData,
                description: e.target.value,
              })}
            />

            <label htmlFor="video">Video:</label>
            <input
              type="file"
              accept="video/*"
              id="video"
              name="video"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  video: e.target.files[0],
                });
                console.log(e.target.files[0]);
              }}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {formError && <div className="error-message">{formError}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </>
  );
};

export default PostLesson;
