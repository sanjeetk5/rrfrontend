import axiosInstance from "../api/axiosInstance";

import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_FAVORITES_SUCCESS,
  TOGGLE_FAVORITE_SUCCESS,
  SET_LOADING,
  SET_ERROR,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
} from "./actionTypes";

// ---------------- LOADING + ERROR ----------------
export const setLoading = (value) => ({
  type: SET_LOADING,
  payload: value,
});

export const setError = (msg) => ({
  type: SET_ERROR,
  payload: msg,
});

// ---------------- SNACKBAR ----------------
export const showSnackbar = (message, severity = "success") => ({
  type: SHOW_SNACKBAR,
  payload: { message, severity },
});

export const hideSnackbar = () => ({
  type: HIDE_SNACKBAR,
});

// ---------------- AUTH ----------------
export const registerUser = (formData, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await axiosInstance.post("/auth/register", formData);

    localStorage.setItem("token", res.data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.user,
    });

    dispatch(showSnackbar("Registered Successfully 🎉", "success"));

    dispatch(setLoading(false));
    navigate("/products");
  } catch (error) {
    dispatch(setLoading(false));

    const msg = error.response?.data?.message || "Register failed";
    dispatch(setError(msg));
    dispatch(showSnackbar(msg, "error"));
  }
};

export const loginUser = (formData, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await axiosInstance.post("/auth/login", formData);

    localStorage.setItem("token", res.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.user,
    });

    dispatch(showSnackbar("Login Successful ✅", "success"));

    dispatch(setLoading(false));
    navigate("/products");
  } catch (error) {
    dispatch(setLoading(false));

    const msg = error.response?.data?.message || "Login failed";
    dispatch(setError(msg));
    dispatch(showSnackbar(msg, "error"));
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");

  dispatch({
    type: LOGOUT,
  });

  dispatch(showSnackbar("Logged out successfully 👋", "info"));
};

// ---------------- PRODUCTS ----------------
export const fetchProducts =
  (page = 1, limit = 6, search = "") =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const res = await axiosInstance.get(
        `/products?page=${page}&limit=${limit}&search=${search}`
      );

      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: res.data,
      });

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError("Failed to load products"));
      dispatch(showSnackbar("Failed to load products", "error"));
    }
  };

export const fetchProductDetail = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await axiosInstance.get(`/products/${id}`);

    dispatch({
      type: FETCH_PRODUCT_DETAIL_SUCCESS,
      payload: res.data,
    });

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError("Failed to load product detail"));
    dispatch(showSnackbar("Failed to load product detail", "error"));
  }
};

// ---------------- FAVORITES ----------------
export const fetchFavorites = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await axiosInstance.get("/favorites");

    dispatch({
      type: FETCH_FAVORITES_SUCCESS,
      payload: res.data,
    });

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError("Failed to load favorites"));
    dispatch(showSnackbar("Failed to load favorites", "error"));
  }
};

export const toggleFavorite = (productId, isFav) => async (dispatch) => {
  try {
    if (isFav) {
      await axiosInstance.delete(`/favorites/${productId}`);
      dispatch(showSnackbar("Removed from favorites ❌", "warning"));
    } else {
      await axiosInstance.post(`/favorites/${productId}`);
      dispatch(showSnackbar("Added to favorites ❤️", "success"));
    }

    dispatch({
      type: TOGGLE_FAVORITE_SUCCESS,
      payload: productId,
    });

    dispatch(fetchFavorites());
  } catch (error) {
    dispatch(setError("Failed to update favorite"));
    dispatch(showSnackbar("Failed to update favorite", "error"));
  }
};
