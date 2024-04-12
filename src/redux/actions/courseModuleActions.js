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

export const fetchCourseModules = (categoryId, courseId) => (dispatch) => {
  dispatch(fetchCourseModulesRequest());
  axios.get(`http://localhost:3000/api/v1/categories/${categoryId}/courses/${courseId}/course_modules`)
    .then((response) => {
      dispatch(fetchCourseModulesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchCourseModulesFailure(error.message));
    });
};

export const postCourseModule = (categoryId, courseId, courseModuleData) => (dispatch) => {
  dispatch(postCourseModuleRequest());
  axios.post(`http://localhost:3000/api/v1/categories/${categoryId}/courses/${courseId}/course_modules`, courseModuleData)
    .then((response) => {
      dispatch(postCourseModuleSuccess(response.data));
    })
    .catch((error) => {
      dispatch(postCourseModuleFailure(error.message));
    });
};
