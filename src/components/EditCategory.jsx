import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editCategory } from '../redux/actions/categoryActions';
import '../styles/Edit.css';
import Navigation3 from './Navigation3';

const EditCategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [category, setCategory] = useState({});

  useEffect(() => {
    const foundCategory = categories.find((cat) => cat.id === categoryId);
    if (foundCategory) {
      setCategory(foundCategory);
    }
  }, [categories, categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editCategory(categoryId, category));
  };

  return (
    <>
      <Navigation3 />
      <div className="edit-category-container">
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={category.title || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={category.description || ''}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <button type="submit" className="submit-btn">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default EditCategoryPage;
