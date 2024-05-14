import axios from 'axios';

export const fetchCategoriesRequest = () => ({
  type: 'FETCH_CATEGORIES_REQUEST',
});

export const fetchCategoriesSuccess = (categories) => ({
  type: 'FETCH_CATEGORIES_SUCCESS',
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: 'FETCH_CATEGORIES_FAILURE',
  payload: error,
});

export const postCategoryRequest = () => ({
  type: 'POST_CATEGORY_REQUEST',
});

export const postCategorySuccess = (category) => ({
  type: 'POST_CATEGORY_SUCCESS',
  payload: category,
});

export const postCategoryFailure = (error) => ({
  type: 'POST_CATEGORY_FAILURE',
  payload: error,
});

export const deleteCategoryRequest = () => ({
  type: 'DELETE_CATEGORY_REQUEST',
});

export const deleteCategorySuccess = (categoryId) => ({
  type: 'DELETE_CATEGORY_SUCCESS',
  payload: categoryId,
});

export const deleteCategoryFailure = (error) => ({
  type: 'DELETE_CATEGORY_FAILURE',
  payload: error,
});

export const editCategoryRequest = () => ({
  type: 'EDIT_CATEGORY_REQUEST',
});

export const editCategorySuccess = (category) => ({
  type: 'EDIT_CATEGORY_SUCCESS',
  payload: category,
});

export const editCategoryFailure = (error) => ({
  type: 'EDIT_CATEGORY_FAILURE',
  payload: error,
});

export const fetchCategories = () => (dispatch) => {
  dispatch(fetchCategoriesRequest());
  axios.get('https://origin8lab-cu7g.onrender.com/api/v1/categories')
    .then((response) => {
      dispatch(fetchCategoriesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchCategoriesFailure(error.message));
    });
};

export const postCategory = (categoryData) => (dispatch) => {
  dispatch(postCategoryRequest());
  axios.post('https://origin8lab-cu7g.onrender.com/api/v1/categories', categoryData)
    .then((response) => {
      dispatch(postCategorySuccess(response.data));
      return response.data;
    })
    .catch((error) => {
      dispatch(postCategoryFailure(error.message));
      throw error;
    });
};

export const deleteCategory = (categoryId) => (dispatch) => {
  dispatch(deleteCategoryRequest());
  axios.delete(`https://origin8lab-cu7g.onrender.com/api/v1/categories/${categoryId}`)
    .then(() => {
      dispatch(deleteCategorySuccess(categoryId));
    })
    .catch((error) => {
      dispatch(deleteCategoryFailure(error.message));
    });
};

export const editCategory = (categoryId, categoryData) => (dispatch) => {
  dispatch(editCategoryRequest());
  axios.put(`https://origin8lab-cu7g.onrender.com/api/v1/categories/${categoryId}`, categoryData)
    .then((response) => {
      dispatch(editCategorySuccess(response.data));
    })
    .catch((error) => {
      dispatch(editCategoryFailure(error.message));
    });
};
