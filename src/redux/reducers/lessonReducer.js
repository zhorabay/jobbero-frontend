const initialState = {
  lessons: [],
  loading: false,
  error: null,
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LESSONS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_LESSONS_SUCCESS':
      return {
        ...state,
        lessons: action.payload,
        loading: false,
      };
    case 'FETCH_LESSONS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'POST_LESSON_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'POST_LESSON_SUCCESS':
      return {
        ...state,
        lesson: action.payload,
        loading: false,
      };
    case 'POST_LESSON_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default lessonReducer;
