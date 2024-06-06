import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { postLesson } from '../redux/actions/lessonActions';
import Navigation3 from './Navigation3';
import '../styles/Post.css';

const PostLesson = () => {
  const { categoryId, courseId, courseModuleId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    files: [],
  });
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const error = useSelector((state) => state.lesson.error);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || formData.files.length === 0) {
      setFormError('Please fill all required fields and upload at least one file');
      return;
    }

    try {
      await dispatch(postLesson(categoryId, courseId, courseModuleId, formData));
      setFormData({ title: '', description: '', files: [] });
      setFormError('');
      alert('Lesson created successfully');
      navigate('/');
    } catch (error) {
      setFormError('An error occurred while submitting the lesson');
    }
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
              onChange={handleFileChange}
            />

            <label htmlFor="image">Images:</label>
            <input
              type="file"
              accept="image/*"
              id="image"
              name="image"
              onChange={handleFileChange}
            />

            <label htmlFor="document">Documents:</label>
            <input
              type="file"
              accept=".pdf,.ppt,.pptx,.doc,.docx"
              id="document"
              name="document"
              onChange={handleFileChange}
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
