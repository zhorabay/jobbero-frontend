const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case 'FETCH_CATEGORIES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'POST_CATEGORY_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'POST_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
      };
    case 'POST_CATEGORY_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'DELETE_CATEGORY_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'DELETE_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.payload),
        loading: false,
      };
    case 'DELETE_CATEGORY_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'EDIT_CATEGORY_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'EDIT_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === action.payload.id) {
            return action.payload;
          }
          return category;
        }),
        loading: false,
      };
    case 'EDIT_CATEGORY_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
