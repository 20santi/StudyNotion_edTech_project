import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  editCourse: false,
  course: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setEditCourse: (state, value) => {
      state.editCourse = value.payload;
    },
    setCourse: (state, value) => {
      state.course = value.payload;
    }
  },
});

export const { setStep, setEditCourse, setCourse } = courseSlice.actions;
export default courseSlice.reducer;
