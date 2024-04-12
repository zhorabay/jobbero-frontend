import {
  SEARCH_INSTRUCTORS_AND_COURSES_REQUEST,
  SEARCH_INSTRUCTORS_AND_COURSES_SUCCESS,
  SEARCH_INSTRUCTORS_AND_COURSES_FAILURE,
} from '../actions/searchActions';

const initialState = {
  loading: false,
  results: [],
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_INSTRUCTORS_AND_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_INSTRUCTORS_AND_COURSES_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
        error: null,
      };
    case SEARCH_INSTRUCTORS_AND_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
