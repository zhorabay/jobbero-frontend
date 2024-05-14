const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COURSES_REQUEST':
    case 'POST_COURSE_REQUEST':
    case 'DELETE_COURSE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_COURSES_SUCCESS':
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case 'POST_COURSE_SUCCESS':
      return {
        ...state,
        courses: [...state.courses, action.payload],
        loading: false,
      };
    case 'DELETE_COURSE_SUCCESS':
      return {
        ...state,
        courses: state.courses.filter((course) => course.id !== action.payload),
        loading: false,
      };
    case 'FETCH_COURSES_FAILURE':
    case 'POST_COURSE_FAILURE':
    case 'DELETE_COURSE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;
