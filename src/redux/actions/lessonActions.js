import axios from 'axios';

export const fetchLessonsRequest = () => ({
  type: 'FETCH_LESSONS_REQUEST',
});

export const fetchLessonsSuccess = (lessons) => ({
  type: 'FETCH_LESSONS_SUCCESS',
  payload: lessons,
});

export const fetchLessonsFailure = (error) => ({
  type: 'FETCH_LESSONS_FAILURE',
  payload: error,
});

export const postLessonRequest = () => ({
  type: 'POST_LESSON_REQUEST',
});

export const postLessonSuccess = (lesson) => (dispatch) => {
  dispatch({
    type: 'POST_LESSON_SUCCESS',
    payload: lesson,
  });
};

export const postLessonFailure = (error) => ({
  type: 'POST_LESSON_FAILURE',
  payload: error,
});

export const fetchLessons = (categoryId, courseId, courseModuleId) => (dispatch) => {
  dispatch(fetchLessonsRequest());
  axios.get(`https://origin8lab-9812617f1fe1.herokuapp.com/api/v1/categories/${categoryId}/courses/${courseId}/course_modules/${courseModuleId}/lessons`)
    .then((response) => {
      dispatch(fetchLessonsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchLessonsFailure(error.message));
    });
};

export const postLesson = (categoryId, courseId, courseModuleId, formData) => (dispatch) => {
  dispatch(postLessonRequest());

  const formDataObj = new FormData();
  formDataObj.append('lesson[course_module_id]', courseModuleId);
  formDataObj.append('lesson[title]', formData.title);
  formDataObj.append('lesson[description]', formData.description);
  formDataObj.append('lesson[video]', formData.video);

  axios.post(`https://origin8lab-9812617f1fe1.herokuapp.com/api/v1/categories/${categoryId}/courses/${courseId}/course_modules/${courseModuleId}/lessons`, formDataObj, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => {
      dispatch(postLessonSuccess(response.data));
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message;
      dispatch(postLessonFailure(errorMessage));
    });
};
