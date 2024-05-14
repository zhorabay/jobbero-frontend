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

export const deleteCourseRequest = () => ({
  type: 'DELETE_COURSE_REQUEST',
});

export const deleteCourseSuccess = (courseId) => ({
  type: 'DELETE_COURSE_SUCCESS',
  payload: courseId,
});

export const deleteCourseFailure = (error) => ({
  type: 'DELETE_COURSE_FAILURE',
  payload: error,
});

export const fetchCourses = (categoryId) => (dispatch) => {
  dispatch(fetchCoursesRequest());
  axios.get(`https://origin8lab-cu7g.onrender.com/api/v1/categories/${categoryId}/courses`)
    .then((response) => {
      dispatch(fetchCoursesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchCoursesFailure(error.message));
    });
};

export const postCourse = (categoryId, courseData) => async (dispatch) => {
  dispatch(postCourseRequest());
  try {
    const response = await axios.post(`https://origin8lab-cu7g.onrender.com/api/v1/categories/${categoryId}/courses`, courseData);
    dispatch(postCourseSuccess(response.data));
  } catch (error) {
    dispatch(postCourseFailure(error.message));
  }
};

export const deleteCourse = (categoryId, courseId) => (dispatch) => {
  dispatch(deleteCourseRequest());
  axios.delete(`https://origin8lab-cu7g.onrender.com/api/v1/categories/${categoryId}/courses/${courseId}`)
    .then(() => {
      dispatch(deleteCourseSuccess(courseId));
    })
    .catch((error) => {
      dispatch(deleteCourseFailure(error.message));
    });
};
