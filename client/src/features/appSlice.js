import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appActions from "./appActions";
import * as appAPI from "./appAPI";

export const FILTER = {
  UNFILTERED: "unfiltered",
  TEMPERAMENT: "temperament",
  ISLOCAL: "isLocal",
};

export const SORT = {
  UNSORTED: "unsorted",
  ALPHABETICAL: "A-Z",
  REVERSE_ALPHABETICAL: "Z-A",
  WEIGHT: "1-9",
  REVERSE_WEIGHT: "9-1",
};

export const STATUS = {
  START: "start",
  LOADING: "loading",
  IDLE: "idle",
  CREATED: "created",
};

const initialFormState = {
  name: "",
  temperaments: [],
  weight: [0, 0],
  height: [0, 0],
  age: [0, 0],
};

const initialState = {
  dogs: [],
  filteredDogs: [],
  temperaments: [],
  details: {},
  status: STATUS.START,
  sortStatus: SORT.UNSORTED,
  filtered: FILTER.UNFILTERED,
  form: initialFormState,
  formError: "",
  dummy: true,
};

export const fillState = createAsyncThunk(
  "app/fetchAll",
  async (_, thunkApi) => {
    const dummy = thunkApi.getState().app.dummy;
    const dogs = await appAPI.getAllDogs(dummy);
    const temperaments = await appAPI.getTemperaments();

    return { dogs: dogs.data, temperaments: temperaments.data };
  }
);

export const fillDogs = createAsyncThunk(
  "app/fetchDogs",
  async (_, thunkApi) => {
    const dummy = thunkApi.getState().app.dummy;
    const result = await appAPI.getAllDogs(dummy);

    return result.data;
  }
);

export const fillByName = createAsyncThunk(
  "app/fetchByName",
  async (query, thunkApi) => {
    const dummy = thunkApi.getState().app.dummy;
    const response = await appAPI.getDogsByName(dummy, query);

    return response.data;
  }
);

export const fillDetails = createAsyncThunk(
  "app/fetchDetails",
  async ({ id, isLocal }, thunkApi) => {
    const dummy = thunkApi.getState().app.dummy;
    const response = await appAPI.getDogById(dummy, id, isLocal);

    return response.data;
  }
);

export const createDog = createAsyncThunk(
  "app/postDog",
  async (_, thunkApi) => {
    const form = thunkApi.getState().app.form;
    const response = await appAPI.postDog({
      ...form,
      weight: form.weight.join(" - "),
      height: form.height.join(" - "),
      age: form.age.join(" - "),
    });

    return response.data[0];
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: appActions,
  extraReducers: (builder) => {
    builder
      .addCase(fillState.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fillState.fulfilled, (state, action) => {
        state.dogs = action.payload.dogs;
        state.temperaments = action.payload.temperaments;
        state.status = STATUS.IDLE;
      })
      .addCase(fillByName.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fillByName.fulfilled, (state, action) => {
        state.dogs = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fillByName.rejected, (state) => {
        state.dogs = [];
        state.status = STATUS.IDLE;
      })
      .addCase(fillDogs.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fillDogs.fulfilled, (state, action) => {
        state.dogs = action.payload;
        state.filteredDogs = [];
        state.status = STATUS.IDLE;
        state.sortStatus = SORT.UNSORTED;
        state.filtered = FILTER.UNFILTERED;
      })
      .addCase(fillDetails.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fillDetails.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.details = action.payload;
      })
      .addCase(createDog.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(createDog.fulfilled, (state, action) => {
        state.status = STATUS.CREATED;
        state.dogs.unshift(action.payload);
      });
  },
});

export const selectDummy = (state) => state.app.dummy;
export const selectFiltered = (state) => state.app.filtered;
export const selectSortStatus = (state) => state.app.sortStatus;
export const selectStatus = (state) => state.app.status;
export const selectDogs = (state) => {
  return { dogs: state.app.dogs, filteredDogs: state.app.filteredDogs };
};
export const selectTemperaments = (state) => state.app.temperaments;
export const selectDetails = (state) => state.app.details;
export const selectForm = (state) => state.app.form;
export const selectFormError = (state) => state.app.formError;

export const {
  toggleDummy,
  clearFilter,
  filterByTemperament,
  filterByIsLocal,
  formClearTemperament,
  formHandleArrayNumbers,
  formHandleError,
  formHandleName,
  formSelectTemperament,
  clearSort,
  sortByName,
  sortByWeight,
  clearDetails,
} = appSlice.actions;

export default appSlice.reducer;
