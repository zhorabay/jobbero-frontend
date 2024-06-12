const initialState = {
  users: [],
  user: null,
  courses: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
    case 'SIGN_UP_REQUEST':
    case 'FETCH_USER_COURSES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_USER_COURSES_SUCCESS':
      return {
        ...state,
        courses: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_USERS_FAILURE':
    case 'SIGN_UP_FAILURE':
    case 'FETCH_USER_COURSES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
