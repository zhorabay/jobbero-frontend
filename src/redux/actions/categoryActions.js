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

export const fetchCategories = () => (dispatch) => {
  dispatch(fetchCategoriesRequest());
  axios.get('https://jobbero-backend.onrender.com/api/v1/categories')
    .then((response) => {
      dispatch(fetchCategoriesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchCategoriesFailure(error.message));
    });
};

export const postCategory = (categoryData) => (dispatch) => {
  dispatch(postCategoryRequest());
  axios.post('https://jobbero-backend.onrender.com/api/v1/categories', categoryData)
    .then((response) => {
      dispatch(postCategorySuccess(response.data));
      return response.data;
    })
    .catch((error) => {
      dispatch(postCategoryFailure(error.message));
      throw error;
    });
};
