import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_FAVORITES_SUCCESS,
  SET_LOADING,
  SET_ERROR,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
} from "./actionTypes";

// 🔥 Refresh handling
const token = localStorage.getItem("token");

const initialState = {
  // If token exists, assume logged in (prevents redirect on refresh)
  user: token ? {} : null,

  products: [],
  total: 0,
  page: 1,
  limit: 6,

  productDetail: null,

  favorites: [],

  loading: false,
  error: null,

  snackbar: {
    open: false,
    message: "",
    severity: "success",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // ✅ REGISTER (no auto login)
    case REGISTER_SUCCESS:
      return {
        ...state,
      };

    // ✅ LOGIN (actual login happens here)
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        favorites: [],
      };

    // PRODUCTS
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        total: action.payload.total,
        page: action.payload.page,
        limit: action.payload.limit,
      };

    case FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetail: action.payload,
      };

    // FAVORITES
    case FETCH_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: action.payload,
      };

    // LOADING
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    // ERROR
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // SNACKBAR SHOW
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.payload.message,
          severity: action.payload.severity,
        },
      };

    // SNACKBAR HIDE
    case HIDE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: false,
          message: "",
          severity: "success",
        },
      };

    default:
      return state;
  }
};

export default reducer;
