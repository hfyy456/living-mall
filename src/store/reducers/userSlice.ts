import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../index';

const userSlice = createSlice({

  name: 'user',
  initialState: { userInfo: {}, isLogin: false, token: '' },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setLogin: (state) => {
      state.isLogin = true;
    },
    setLogout: (state) => {
      state.isLogin = false;
    },

  },
});


export const { setUserInfo, setLogin, setLogout, setToken } = userSlice.actions;


export default userSlice.reducer;

export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectIsLogin = (state: RootState) => state.user.isLogin;
export const selectToken = (state: RootState) => state.user.token;
