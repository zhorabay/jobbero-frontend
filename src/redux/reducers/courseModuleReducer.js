const initialState = {
  modules: [],
  loading: false,
  error: null,
};

const courseModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MODULES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_MODULES_SUCCESS':
      return {
        ...state,
        modules: action.payload,
        loading: false,
      };
    case 'FETCH_MODULES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'POST_MODULE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'POST_MODULE_SUCCESS':
      return {
        ...state,
        module: action.payload,
        loading: false,
      };
    case 'POST_MODULE_FAILURE':
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
