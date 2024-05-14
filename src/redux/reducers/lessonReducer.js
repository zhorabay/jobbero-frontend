const initialState = {
  lessons: [],
  loading: false,
  error: null,
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LESSONS_REQUEST':
    case 'POST_LESSON_REQUEST':
    case 'DELETE_LESSON_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_LESSONS_SUCCESS': {
      const lessons = Array.isArray(action.payload.lessons) ? action.payload.lessons : [];
      return {
        ...state,
        lessons,
        loading: false,
      };
    }
    case 'FETCH_LESSONS_FAILURE':
    case 'POST_LESSON_FAILURE':
    case 'DELETE_LESSON_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'POST_LESSON_SUCCESS':
      return {
        ...state,
        lessons: [...state.lessons, action.payload],
        loading: false,
      };
    case 'DELETE_LESSON_SUCCESS':
      return {
        ...state,
        lessons: state.lessons.filter((lesson) => lesson.id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};

export default lessonReducer;
