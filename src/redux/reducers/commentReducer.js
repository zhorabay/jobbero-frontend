const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COMMENTS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_COMMENTS_SUCCESS':
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case 'FETCH_COMMENTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'POST_COMMENT_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'POST_COMMENT_SUCCESS':
      return {
        ...state,
        comment: action.payload,
        loading: false,
      };
    case 'POST_COMMENT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default commentReducer;
