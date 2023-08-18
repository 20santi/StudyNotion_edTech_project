const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },

    setToken(state, value) {
      state.token = value.payload;
    },

    setSignupData(state, value) {
      state.signupData = value.payload;
    },
  },
});

export const { setLoading, setSignupData, setToken } = authSlice.actions;
export default authSlice.reducer;
