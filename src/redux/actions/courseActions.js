import axios from 'axios';

export const fetchCoursesRequest = () => ({
  type: 'FETCH_COURSES_REQUEST',
});

export const fetchCoursesSuccess = (courses) => ({
  type: 'FETCH_COURSES_SUCCESS',
  payload: courses,
});

export const fetchCoursesFailure = (error) => ({
  type: 'FETCH_COURSES_FAILURE',
  payload: error,
});

export const postCourseRequest = () => ({
  type: 'POST_COURSE_REQUEST',
});

export const postCourseSuccess = (course) => ({
  type: 'POST_COURSE_SUCCESS',
  payload: course,
});

export const postCourseFailure = (error) => ({
  type: 'POST_COURSE_FAILURE',
  payload: error,
});

export const fetchCourses = (categoryId) => (dispatch) => {
  dispatch(fetchCoursesRequest());
  axios.get(`http://localhost:3000/api/v1/categories/${categoryId}/courses`)
    .then((response) => {
      dispatch(fetchCoursesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchCoursesFailure(error.message));
    });
};

export const postCourse = (categoryId, courseData) => (dispatch) => {
  dispatch(postCourseRequest());
  axios.post(`http://localhost:3000/api/v1/categories/${categoryId}/courses`, courseData)
    .then((response) => {
      dispatch(postCourseSuccess(response.data));
    })
    .catch((error) => {
      dispatch(postCourseFailure(error.message));
    });
};
