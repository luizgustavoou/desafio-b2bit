import { ILoginResponse, IUser } from "@/apis/auth.api";

import { HttpError } from "@/exceptions/http-error";
import { authService, storageService } from "@/services";
import { AppDispatch, RootState } from "@/store";
import { ILoginParams } from "@/types/ILoginParams";
// import { serializeUserJwt } from "@/utils/serializa-user-jwt";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: IUser | null;
  status: "idle" | "loading" | "success" | "error";
  message: string | null;
}

const userJSON = storageService.getItem("user");

const user: IUser | null = userJSON ? JSON.parse(userJSON) : null;

const initialState: AuthState = {
  user,
  status: "idle",
  message: null,
};

export const signin = createAsyncThunk<
  ILoginResponse,
  ILoginParams,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("auth/login", async (data, thunkAPI) => {
  try {
    const res = await authService.login(data);

    return res;
  } catch (error: any) {
    let errorMessage = "Ocorreu algum erro. Por favor, tente mais tarde.";

    if (error instanceof HttpError) errorMessage = error.message;

    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      storageService.removeItem("accessToken");
      storageService.removeItem("refreshToken");

      state.user = null;
    },
    resetMessage(state) {
      state.message = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(signin.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "success";
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      });
  },
});

export const { logout, resetMessage } = authSlice.actions;
export const authSelector = (state: RootState) => state.authReducer;
export default authSlice.reducer;
