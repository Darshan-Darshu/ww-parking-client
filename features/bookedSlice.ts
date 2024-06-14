import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { Booked } from "@/booked.t";

// Define a type for the slice state

interface BookedState {
  booked: Booked[];
}

// Define the initial state using that type
const initialState: BookedState = {
  booked: [],
};

export const counterSlice = createSlice({
  name: "booked",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    bookParkingAllot: (
      state,
      action: PayloadAction<Booked>,
    ) => {
      state.booked.push(action.payload);
    },
    cancelParking: (
      state,
      action: PayloadAction<number>,
    ) => {
      const booked = state.booked;
      console.log(booked);
      const firstBookedArray = state.booked.slice(
        0,
        action.payload,
      );
      const secondBookedArray = state.booked.slice(
        action.payload + 1,
        booked.length,
      );
      console.log(firstBookedArray);
      console.log(secondBookedArray);

      state.booked = [
        ...firstBookedArray,
        ...secondBookedArray,
      ];
    },
  },
});

export const { bookParkingAllot, cancelParking } =
  counterSlice.actions;

export default counterSlice.reducer;
