
import { createSlice } from "@reduxjs/toolkit";

function loadRegistrations() {
  try {
    return JSON.parse(
      localStorage.getItem("eventhub_registrations") || "[]"
    );
  } catch {
    return [];
  }
}

const registrationSlice = createSlice({
  name: "registrations",

  initialState: {
    items: loadRegistrations(),
  },

  reducers: {
    registerEvent: (state, action) => {
      const { userId, event } = action.payload;

      const alreadyRegistered = state.items.some(
        (item) =>
          item.userId === userId &&
          item.event.id === event.id
      );

      if (!alreadyRegistered) {
        state.items.push({
          userId,
          event,
          registeredAt: new Date().toISOString(),
        });

        localStorage.setItem(
          "eventhub_registrations",
          JSON.stringify(state.items)
        );
      }
    },

    cancelRegistration: (state, action) => {
      const { userId, eventId } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(
            item.userId === userId &&
            item.event.id === eventId
          )
      );

      localStorage.setItem(
        "eventhub_registrations",
        JSON.stringify(state.items)
      );
    },
  },
});

export const {
  registerEvent,
  cancelRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;
