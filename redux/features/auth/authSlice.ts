import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  role: "USER" | "ADMIN" | null;
  isTrial: boolean;
  isSubscribed?: boolean;
  trialStartDate?: string;
  subscription?: any;
}

interface SetCredentialsPayload {
  token?: string | null;
  role?: "USER" | "ADMIN" | null;
  isTrial?: boolean;
  isSubscribed?: boolean;
  trialStartDate?: string;
  subscription?: any;
}

// const initialState: AuthState = {
//   token: Cookies.get("token") || null, 
//   role: (Cookies.get("role") as "USER" | "ADMIN") || null,
//   isTrial: Cookies.get("isTrial") === "true" || false,
//   isSubscribed: Cookies.get("isSubscribed") === "true" || false,
//   trialStartDate: Cookies.get("trialStartDate") || undefined,
//   subscription: undefined,
// };

const initialState: AuthState = {
  token: Cookies.get("token") || null,
  role: (Cookies.get("role") as "USER" | "ADMIN") || null,
  isTrial: Cookies.get("isTrial") === "true" || false,
  isSubscribed: Cookies.get("isSubscribed") === "true" || false,
  trialStartDate: Cookies.get("trialStartDate") || undefined,
  subscription: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { token, role, isTrial, trialStartDate, isSubscribed } = action.payload;

      if (token !== undefined) {
        state.token = token;
        token ? Cookies.set("token", token) : Cookies.remove("token");
      }

      if (role !== undefined) {
        state.role = role;
        role ? Cookies.set("role", role) : Cookies.remove("role");
      }

      if (isTrial !== undefined) {
        state.isTrial = isTrial;
        Cookies.set("isTrial", isTrial.toString());
      }

      if (trialStartDate !== undefined) {
        state.trialStartDate = trialStartDate;
        Cookies.set("trialStartDate", trialStartDate);
      }

        if (isSubscribed !== undefined) {
        state.isSubscribed = isSubscribed;
        Cookies.set("isSubscribed", isSubscribed.toString());
      }
    },

    logOut: (state) => {
      state.token = null;
      state.role = null;
      state.isTrial = false;
      state.isSubscribed = false;
      state.trialStartDate = undefined;
      state.subscription = undefined;

      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("isTrial");
      Cookies.remove("isSubscribed");
      Cookies.remove("trialStartDate");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;



