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

    setFormData((prevData) => {
      // Filter out files that are already in the state
      const newFiles = files.filter((file) => !prevData[name].some((existingFile) => existingFile.name === file.name
          && existingFile.size === file.size
          && existingFile.lastModified === file.lastModified));

      const updatedFiles = [...prevData[name], ...newFiles];
      const newFormData = {
        ...prevData,
        [name]: updatedFiles,
      };

      console.log(`New ${name} files to add:`, newFiles);
      console.log('Updated Form Data:', newFormData);
      return newFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const {
      title, description, videos, images, documents,
    } = formData;

    if (!title || !description || (videos.length === 0 && images.length === 0 && documents.length === 0)) {
      setFormError('Please fill all required fields and upload at least one file');
      setIsSubmitting(false);
      return;
    }

    const allFiles = [...videos, ...images, ...documents];

    try {
      await dispatch(postLesson(categoryId, courseId, courseModuleId, { title, description, files: allFiles }));
      setFormData({
        title: '', description: '', videos: [], images: [], documents: [],
      });
      setFormError('');
      alert('Lesson created successfully');
      navigate('/');
    } catch (error) {
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
