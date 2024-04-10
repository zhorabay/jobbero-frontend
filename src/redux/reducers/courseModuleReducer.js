const initialState = {
  course_modules: [],
  loading: false,
  error: null,
};

const courseModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COURSE_MODULES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_COURSE_MODULES_SUCCESS':
      return {
        ...state,
        course_modules: action.payload,
        loading: false,
      };
    case 'FETCH_COURSE_MODULES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'POST_COURSE_MODULE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'POST_COURSE_MODULE_SUCCESS':
      return {
        ...state,
        course_module: action.payload,
        loading: false,
      };
    case 'POST_COURSE_MODULE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default courseModuleReducer;
