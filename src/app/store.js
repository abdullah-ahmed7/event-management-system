
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice.js";
import registrationReducer from "../features/registrations/registrationSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registrations: registrationReducer,
  },
});
