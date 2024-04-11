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

export const postLessonSuccess = (lesson) => ({
  type: 'POST_LESSON_SUCCESS',
  payload: lesson,
});

export const postLessonFailure = (error) => ({
  type: 'POST_LESSON_FAILURE',
  payload: error,
});

export const fetchLessons = () => (dispatch) => {
  dispatch(fetchLessonsRequest());
  axios.get('http://localhost:3000/api/v1/categories/:category_id/courses/:course_id/course_modules/:course_module_id/lessons')
    .then((response) => {
      dispatch(fetchLessonsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchLessonsFailure(error.message));
    });
};

export const postLesson = (lessonData) => (dispatch) => {
  dispatch(postLessonRequest());
  axios.post('http://localhost:3000/api/v1/categories/:category_id/courses/:course_id/course_modules/:course_module_id/lessons', lessonData)
    .then((response) => {
      dispatch(postLessonSuccess(response.data));
    })
    .catch((error) => {
      dispatch(postLessonFailure(error.message));
    });
};
