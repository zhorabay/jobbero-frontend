import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editCategory, fetchCategories } from '../redux/actions/categoryActions';
import Navigation3 from './Navigation3';

const EditCategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories.categories);
  const [category, setCategory] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    const foundCategory = categories.find((cat) => cat.id === parseInt(categoryId));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editCategory(categoryId, category));
      setSuccessMessage('Category updated successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  if (!categories.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation3 />
      <div className="edit-category-container">
        <h2>Edit Category</h2>
        {successMessage && <p>{successMessage}</p>}
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
            <label htmlFor="description">Image:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={category.image || ''}
              onChange={handleChange}
              placeholder="Image URL"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default EditCategoryPage;
