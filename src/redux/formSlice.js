import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    step1: {
      name: "",
      email: "",
      password: "",
    },
    step2: {
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    step3: {
      creditCard: "",
      expiry: "",
      cvv: "",
    },
  },
  currentStep: "step1",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { step, field, value } = action.payload;
      state.formData[step][field] = value;
    },
    goToStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { updateFormData, goToStep } = formSlice.actions;

export default formSlice.reducer;
