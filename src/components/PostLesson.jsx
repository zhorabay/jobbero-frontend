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
    google_form_links: [],
    videos: [],
    images: [],
    documents: [],
  });
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.lesson.error);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const { name } = e.target;

    const validFiles = files.filter((file) => file instanceof File);

    setFormData((prevData) => ({
      ...prevData,
      [name]: [...prevData[name], ...validFiles],
    }));
  };

  const handleLinkChange = (index, e) => {
    const newLinks = [...formData.google_form_links];
    newLinks[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      google_form_links: newLinks,
    }));
  };

  const addLinkField = () => {
    setFormData((prevData) => ({
      ...prevData,
      google_form_links: [...prevData.google_form_links, ''],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const {
      title, description, google_form_links, videos, images, documents,
    } = formData;

    console.log('Form Data on Submit:', formData);
    console.log('Google Form Links on Submit:', google_form_links);

    if (!title || !description) {
      setFormError('Please fill all required fields');
      console.error('Form validation error: Missing title or description');
      setIsSubmitting(false);
      return;
    }

    const allFiles = [...videos, ...images, ...documents];

    try {
      await dispatch(postLesson(categoryId, courseId, courseModuleId, {
        title, description, google_form_links, files: allFiles,
      }));
      console.log('Lesson created successfully');
      setFormData({
        title: '', description: '', google_form_links: [], videos: [], images: [], documents: [],
      });
      setFormError('');
      alert('Lesson created successfully');
      navigate('/');
    } catch (error) {
      console.error('Error during lesson creation:', error);
      setFormError('An error occurred while submitting the lesson');
    } finally {
      setIsSubmitting(false);
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

            {formData.google_form_links.map((link, index) => (
              <div key={link.id || index}>
                <label htmlFor={`google_form_link_${index}`}>Google Form Link:</label>
                <input
                  type="url"
                  id={`google_form_link_${index}`}
                  name="google_form_links"
                  value={link}
                  onChange={(e) => handleLinkChange(index, e)}
                />
              </div>
            ))}
            <button type="button" onClick={addLinkField}>Add Another Link</button>

            <label htmlFor="videos">Video:</label>
            <input
              type="file"
              accept="video/*"
              id="videos"
              name="videos"
              onChange={handleFileChange}
              multiple
            />

            <label htmlFor="images">Images:</label>
            <input
              type="file"
              accept="image/*"
              id="images"
              name="images"
              onChange={handleFileChange}
              multiple
            />

            <label htmlFor="documents">Documents:</label>
            <input
              type="file"
              accept=".pdf,.ppt,.pptx,.doc,.docx"
              id="documents"
              name="documents"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
        {formError && <div className="error-message">{formError}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </>
  );
};

export default PostLesson;
