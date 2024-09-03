import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    authToken: null,
    userData: null,
    companyData: null
  },
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    removeUser(state) {
      state.userData = null;
    },
    setCompanyData(state, action) {
      state.companyData = action.payload;
    },
    removeCompanyData(state) {
      state.companyData = null;
    },
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
    removeAuthToken(state) {
      state.authToken = null;
    },
  },
});

export const {
  setUser,
  removeUser,
  setCompanyData,
  removeCompanyData,
  setAuthToken,
  removeAuthToken,
} = authSlice.actions;

export default authSlice.reducer;

export const selectAuthToken = (state) => state.user.authToken;

export const selectUser = (state) => state.user.userData;

export const selectCompany = (state) => state.user.companyData;
