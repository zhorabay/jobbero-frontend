import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postCategory } from '../redux/actions/categoryActions';
import '../styles/Post.css';
import Navigation3 from './Navigation3';

const PostCategory = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'image') {
      setImage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postCategory({ title, image }));
      setTitle('');
      setImage('');
      navigate('/');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <>
      <Navigation3 />
      <div className="post-category-container">
        <h2>Post Category</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={title} onChange={handleChange} placeholder="Category Title" required />
          <input type="text" name="image" value={image} onChange={handleChange} placeholder="Image URL" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

// PostCategory.propTypes = {
//   postCategory: PropTypes.func.isRequired,
// };

export default PostCategory;
