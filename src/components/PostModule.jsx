import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { postCourseModule } from '../redux/actions/courseModuleActions';
import '../styles/Post.css';

function PostCourseModule({ postCourseModule }) {
  const { categoryId, courseId } = useParams();
  const [moduleData, setModuleData] = useState({
    title: '',
    description: '',
    week: '',
    amountOfLessons: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postCourseModule(categoryId, courseId, moduleData);
    setModuleData({
      title: '',
      description: '',
      week: '',
      amountOfLessons: '',
    });
  };

  const {
    title, description, week, amountOfLessons,
  } = moduleData;

  return (
    <div className="post-module-container">
      <h2>Post Course Module</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={title} onChange={handleChange} placeholder="Module Title" required />
        <textarea name="description" value={description} onChange={handleChange} placeholder="Description" required />
        <input type="text" name="week" value={week} onChange={handleChange} placeholder="Week" required />
        <input type="text" name="amountOfLessons" value={amountOfLessons} onChange={handleChange} placeholder="Lesson Amount" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

PostCourseModule.propTypes = {
  postCourseModule: PropTypes.func.isRequired,
};

export default connect(null, { postCourseModule })(PostCourseModule);
