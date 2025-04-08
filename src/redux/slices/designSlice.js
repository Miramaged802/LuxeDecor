import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedDesigns: JSON.parse(localStorage.getItem("savedDesigns")) || [],
};

const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    saveDesign: (state, action) => {
      state.savedDesigns.push(action.payload);
      localStorage.setItem("savedDesigns", JSON.stringify(state.savedDesigns));
    },
    removeDesign: (state, action) => {
      state.savedDesigns = state.savedDesigns.filter(
        (design) => design.id !== action.payload
      );
      localStorage.setItem("savedDesigns", JSON.stringify(state.savedDesigns));
    },
    clearDesigns: (state) => {
      state.savedDesigns = [];
      localStorage.removeItem("savedDesigns");
    },
    updateDesign: (state, action) => {
      const { id, updates } = action.payload;
      const designIndex = state.savedDesigns.findIndex(
        (design) => design.id === id
      );
      if (designIndex !== -1) {
        state.savedDesigns[designIndex] = {
          ...state.savedDesigns[designIndex],
          ...updates,
        };
        localStorage.setItem(
          "savedDesigns",
          JSON.stringify(state.savedDesigns)
        );
      }
    },
  },
});

export const { saveDesign, removeDesign, clearDesigns, updateDesign } =
  designSlice.actions;

export default designSlice.reducer;
