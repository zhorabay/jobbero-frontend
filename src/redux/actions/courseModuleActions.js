import axios from 'axios';

export const fetchCourseModulesRequest = () => ({
  type: 'FETCH_MODULES_REQUEST',
});

export const fetchCourseModulesSuccess = (courseModules) => ({
  type: 'FETCH_MODULES_SUCCESS',
  payload: courseModules,
});

export const fetchCourseModulesFailure = (error) => ({
  type: 'FETCH_MODULES_FAILURE',
  payload: error,
});

export const postCourseModuleRequest = () => ({
  type: 'POST_MODULE_REQUEST',
});

export const postCourseModuleSuccess = (courseModule) => ({
  type: 'POST_MODULE_SUCCESS',
  payload: courseModule,
});

export const postCourseModuleFailure = (error) => ({
  type: 'POST_MODULE_FAILURE',
  payload: error,
});

export const fetchCourseModules = (categoryId, courseId) => (dispatch) => {
  dispatch(fetchCourseModulesRequest());
  axios.get(`https://origin8lab.onrender.com/api/v1/categories/${categoryId}/courses/${courseId}/course_modules`)
    .then((response) => {
      dispatch(fetchCourseModulesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchCourseModulesFailure(error.message));
    });
};

export const postCourseModule = (categoryId, courseId, courseModuleData) => (dispatch) => {
  dispatch(postCourseModuleRequest());
  axios.post(`https://origin8lab.onrender.com/api/v1/categories/${categoryId}/courses/${courseId}/course_modules`, courseModuleData)
    .then((response) => {
      dispatch(postCourseModuleSuccess(response.data));
    })
    .catch((error) => {
      dispatch(postCourseModuleFailure(error.message));
    });
};
