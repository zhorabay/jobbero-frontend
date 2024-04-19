import axios from 'axios';

export const SEARCH_INSTRUCTORS_AND_COURSES_REQUEST = 'SEARCH_INSTRUCTORS_AND_COURSES_REQUEST';
export const SEARCH_INSTRUCTORS_AND_COURSES_SUCCESS = 'SEARCH_INSTRUCTORS_AND_COURSES_SUCCESS';
export const SEARCH_INSTRUCTORS_AND_COURSES_FAILURE = 'SEARCH_INSTRUCTORS_AND_COURSES_FAILURE';

export const searchInstructorsAndCoursesRequest = () => ({
  type: SEARCH_INSTRUCTORS_AND_COURSES_REQUEST,
});

export const searchInstructorsAndCoursesSuccess = (data) => ({
  type: SEARCH_INSTRUCTORS_AND_COURSES_SUCCESS,
  payload: data,
});

export const searchInstructorsAndCoursesFailure = (error) => ({
  type: SEARCH_INSTRUCTORS_AND_COURSES_FAILURE,
  payload: error,
});

export const searchInstructorsAndCourses = (query) => async (dispatch) => {
  dispatch(searchInstructorsAndCoursesRequest());
  try {
    const response = await axios.get('https://origin8lab-9812617f1fe1.herokuapp.com/search', { params: { query } });
    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
    dispatch(searchInstructorsAndCoursesSuccess(response.data));
  } catch (error) {
    dispatch(searchInstructorsAndCoursesFailure(error.message));
  }
};
