const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_REVIEWS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_REVIEWS_SUCCESS':
      return {
        ...state,
        reviews: action.payload,
        loading: false,
      };
    case 'FETCH_REVIEWS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
        case 'POST_REVIEW_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'POST_REVIEW_SUCCESS':
      return {
        ...state,
        review: action.payload,
        loading: false,
      };
    case 'POST_REVIEW_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reviewReducer;
