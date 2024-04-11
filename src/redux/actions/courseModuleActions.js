import axios from 'axios';

export const fetchCourseModulesRequest = () => ({
  type: 'FETCH_COURSE_MODULES_REQUEST',
});

export const fetchCourseModulesSuccess = (courseModules) => ({
  type: 'FETCH_COURSE_MODULES_SUCCESS',
  payload: courseModules,
});

export const fetchCourseModulesFailure = (error) => ({
  type: 'FETCH_COURSE_MODULES_FAILURE',
  payload: error,
});

export const postCourseModuleRequest = () => ({
  type: 'POST_COURSE_MODULES_REQUEST',
});

export const postCourseModuleSuccess = (courseModule) => ({
  type: 'POST_COURSE_MODULES_SUCCESS',
  payload: courseModule,
});

export const postCourseModuleFailure = (error) => ({
  type: 'POST_COURSE_MODULES_FAILURE',
  payload: error,
});

export const fetchCourseModules = () => (dispatch) => {
  dispatch(fetchCourseModulesRequest());
  axios.get('http://localhost:3000/api/v1/categories/:category_id/courses/:course_id/course_modules')
    .then((response) => {
      dispatch(fetchCourseModulesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchCourseModulesFailure(error.message));
    });
};

export const postCourseModule = (courseModuleData) => (dispatch) => {
  dispatch(postCourseModuleRequest());
  axios.post('http://localhost:3000/api/v1/categories/:category_id/courses/:course_id/course_modules', courseModuleData)
    .then((response) => {
      dispatch(postCourseModuleSuccess(response.data));
    })
    .catch((error) => {
      dispatch(postCourseModuleFailure(error.message));
    });
};
