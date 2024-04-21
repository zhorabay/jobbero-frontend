import axios from 'axios';

export const fetchReviewsRequest = () => ({
  type: 'FETCH_REVIEWS_REQUEST',
});

export const fetchReviewsSuccess = (reviews) => ({
  type: 'FETCH_REVIEWS_SUCCESS',
  payload: reviews,
});

export const fetchReviewsFailure = (error) => ({
  type: 'FETCH_REVIEWS_FAILURE',
  payload: error,
});

export const postReviewRequest = () => ({
  type: 'POST_REVIEW_REQUEST',
});

export const postReviewSuccess = (review) => ({
  type: 'POST_REVIEW_SUCCESS',
  payload: review,
});

export const postReviewFailure = (error) => ({
  type: 'POST_REVIEW_FAILURE',
  payload: error,
});

export const fetchReviews = (categoryId, courseId) => (dispatch) => {
  dispatch(fetchReviewsRequest());
  axios.get(`https://jobbero-backend.onrender.com/api/v1/categories/${categoryId}/courses/${courseId}/reviews`)
    .then((response) => {
      dispatch(fetchReviewsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchReviewsFailure(error.message));
    });
};

export const postReview = (reviewData, categoryId, courseId) => (dispatch) => {
  dispatch(postReviewRequest());
  axios.post(`https://jobbero-backend.onrender.com/api/v1/categories/${categoryId}/courses/${courseId}/reviews`, reviewData)
    .then((response) => {
      dispatch(postReviewSuccess(response.data));
    })
    .catch((error) => {
      dispatch(postReviewFailure(error.message));
    });
};
