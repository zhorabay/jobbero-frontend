import axios from 'axios';

export const fetchCommentsRequest = () => ({
  type: 'FETCH_COMMENTS_REQUEST',
});

export const fetchCommentsSuccess = (comments) => ({
  type: 'FETCH_COMMENTS_SUCCESS',
  payload: comments,
});

export const fetchCommentsFailure = (error) => ({
  type: 'FETCH_COMMENTS_FAILURE',
  payload: error,
});

export const postCommentRequest = () => ({
  type: 'POST_COMMENT_REQUEST',
});

export const postCommentSuccess = (comment) => ({
  type: 'POST_COMMENT_SUCCESS',
  payload: comment,
});

export const postCommentFailure = (error) => ({
  type: 'POST_COMMENT_FAILURE',
  payload: error,
});

export const fetchComments = () => (dispatch) => {
  dispatch(fetchCommentsRequest());
  axios.get('https://jobbero-backend-gcp91qfk2-zhorabays-projects.vercel.app/api/v1/categories/:category_id/courses/:course_id/course_modules/:course_module_id/lessons/:lesson_id/comments')
    .then((response) => {
      dispatch(fetchCommentsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchCommentsFailure(error.message));
    });
};

export const postComment = (commentData) => (dispatch) => {
  dispatch(postCommentRequest());
  axios.post('https://jobbero-backend-gcp91qfk2-zhorabays-projects.vercel.app/api/v1/categories/:category_id/courses/:course_id/course_modules/:course_module_id/lessons/:lesson_id/comments', commentData)
    .then((response) => {
      dispatch(postCommentSuccess(response.data));
    })
    .catch((error) => {
      dispatch(postCommentFailure(error.message));
    });
};
