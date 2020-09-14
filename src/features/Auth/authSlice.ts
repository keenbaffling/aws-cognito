import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import * as cognito from '../../services/aws/cognito';

export enum STATUS {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export type User = {
  id: string;
  email: string;
  name: string;
};

export type InitialState = {
  user: User | null;
  status: STATUS;
  error: string | null;
};

const initialState: InitialState = {
  user: null,
  status: STATUS.SUCCESS,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init(state) {
      state.user = null;
      state.error = null;
      state.status = STATUS.PENDING;
    },
    fail(state, action) {
      state.user = null;
      state.error = action.payload;
      state.status = STATUS.FAIL;
    },
    success(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.error = null;
      state.status = STATUS.SUCCESS;
    },
    clear(state) {
      state.user = null;
      state.error = null;
      state.status = STATUS.SUCCESS;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setStatus(state, action: PayloadAction<STATUS>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  init,
  fail,
  success,
  clear,
  setUser,
  setStatus,
  setError,
} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectError = (state: RootState) => state.auth.error;
export const selectStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;

export const signUp = (payload: cognito.AuthParams): AppThunk => async (
  dispatch
) => {
  try {
    const result = await cognito.signUp(payload);

    if (!result?.user) {
      return;
    }
  } catch (error) {
    return error.message || error;
  }
};

export const signIn = (payload: cognito.AuthParams): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(init());
    const result = await cognito.signIn(payload);

    if (!result.attributes) {
      throw new Error('Unable to retrieve user data.');
    }

    dispatch(
      success({
        id: result.username,
        email: result.attributes.email,
        name: '',
      })
    );
  } catch (error) {
    let err = error.message || error.toString();

    if (error.message.includes('Incorrect username or password')) {
      err = 'Invalid email or password.';
    }

    dispatch(fail(err));
  }
};

export const signOut = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setStatus(STATUS.PENDING));
    await cognito.signOut();
    dispatch(clear());
  } catch (error) {
    let err = error.message || error.toString();
    dispatch(fail(err));
  }
};
