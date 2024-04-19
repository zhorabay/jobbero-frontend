import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { postCourse } from '../redux/actions/courseActions';
import '../styles/Post.css';

function PostCourse({ postCourse }) {
  const { categoryId } = useParams();
  const [courseData, setCourseData] = useState({
    title: '',
    image: '',
    description: '',
    price: '',
    about: '',
    duration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postCourse(categoryId, courseData);
    setCourseData({
      title: '',
      image: '',
      description: '',
      price: '',
      about: '',
      duration: '',
    });
  }

  const { title, image, description, price, about, duration } = courseData;

  return (
    <div className="post-course-container">
      <h2>Post Course</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={title} onChange={handleChange} placeholder="Course Title" required />
        <input type="text" name="image" value={image} onChange={handleChange} placeholder="Image URL" required />
        <textarea name="description" value={description} onChange={handleChange} placeholder="Description" required />
        <input type="text" name="price" value={price} onChange={handleChange} placeholder="Price" required />
        <textarea name="about" value={about} onChange={handleChange} placeholder="About" required />
        <input type="text" name="duration" value={duration} onChange={handleChange} placeholder="Duration" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

PostCourse.propTypes = {
  postCourse: PropTypes.func.isRequired,
};

export default connect(null, { postCourse })(PostCourse);
