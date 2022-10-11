import { FILTER, SORT } from "./appSlice";

const appActions = {
  toggleDummy: (state) => {
    state.dummy = !state.dummy;
  },
  clearFilter: (state) => {
    state.filtered = FILTER.UNFILTERED;
    state.filteredDogs = [];
  },
  filterByTemperament: (state, action) => {
    state.filtered = FILTER.TEMPERAMENT;
    state.filteredDogs = state.dogs.filter((dog) => {
      return (
        dog.temperaments.filter(
          (value) => value.id.toString() === action.payload
        ).length === 1
      );
    });
  },
  filterByIsLocal: (state, action) => {
    state.filtered = FILTER.ISLOCAL;
    state.filteredDogs = state.dogs.filter(
      (dog) => dog.isLocal === (action.payload === "true")
    );
  },
  clearSort: (state) => {
    state.sortStatus = SORT.UNSORTED;
    state.dogs = state.dogs.sort(
      (a, b) => Number(a.isLocal) - Number(b.isLocal) || a.id - b.id
    );
    if (state.filteredDogs.length > 0)
      state.filteredDogs = state.filteredDogs.sort(
        (a, b) => Number(a.isLocal) - Number(b.isLocal) || a.id - b.id
      );
  },
  sortByName: (state) => {
    switch (state.sortStatus) {
      case SORT.UNSORTED:
        state.sortStatus = SORT.ALPHABETICAL;
        state.dogs = state.dogs.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        if (state.filteredDogs.length > 0)
          state.filteredDogs = state.filteredDogs.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
        break;
      case SORT.ALPHABETICAL:
        state.sortStatus = SORT.REVERSE_ALPHABETICAL;
        state.dogs = state.dogs.sort((a, b) =>
          b.name > a.name ? 1 : a.name > b.name ? -1 : 0
        );
        if (state.filteredDogs.length > 0)
          state.filteredDogs = state.filteredDogs.sort((a, b) =>
            b.name > a.name ? 1 : a.name > b.name ? -1 : 0
          );
        break;
      default:
        state.sortStatus = SORT.ALPHABETICAL;
        state.dogs = state.dogs.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        if (state.filteredDogs.length > 0)
          state.filteredDogs = state.filteredDogs.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
    }
  },
  sortByWeight: (state) => {
    switch (state.sortStatus) {
      case SORT.UNSORTED:
        state.sortStatus = SORT.WEIGHT;
        state.dogs = state.dogs.sort(
          (a, b) =>
            a.weight
              .split(" - ")
              .map((value) =>
                value.slice(-2) === "kg"
                  ? parseInt(value.slice(0, -2))
                  : parseInt(value)
              )[0] -
            b.weight
              .split(" - ")
              .map((value) =>
                value.slice(-2) === "kg"
                  ? parseInt(value.slice(0, -2))
                  : parseInt(value)
              )[0]
        );
        if (state.filteredDogs.length > 0)
          state.filteredDogs = state.filteredDogs.sort(
            (a, b) =>
              a.weight
                .split(" - ")
                .map((value) =>
                  value.slice(-2) === "kg"
                    ? parseInt(value.slice(0, -2))
                    : parseInt(value)
                )[0] -
              b.weight
                .split(" - ")
                .map((value) =>
                  value.slice(-2) === "kg"
                    ? parseInt(value.slice(0, -2))
                    : parseInt(value)
                )[0]
          );
        break;
      case SORT.WEIGHT:
        state.sortStatus = SORT.REVERSE_WEIGHT;
        state.dogs = state.dogs.sort(
          (a, b) =>
            b.weight
              .split(" - ")
              .map((value) =>
                value.slice(-2) === "kg"
                  ? parseInt(value.slice(0, -2))
                  : parseInt(value)
              )[1] -
            a.weight
              .split(" - ")
              .map((value) =>
                value.slice(-2) === "kg"
                  ? parseInt(value.slice(0, -2))
                  : parseInt(value)
              )[1]
        );
        if (state.filteredDogs.length > 0)
          state.filteredDogs = state.filteredDogs.sort(
            (a, b) =>
              b.weight
                .split(" - ")
                .map((value) =>
                  value.slice(-2) === "kg"
                    ? parseInt(value.slice(0, -2))
                    : parseInt(value)
                )[1] -
              a.weight
                .split(" - ")
                .map((value) =>
                  value.slice(-2) === "kg"
                    ? parseInt(value.slice(0, -2))
                    : parseInt(value)
                )[1]
          );
        break;
      default:
        state.sortStatus = SORT.WEIGHT;
        state.dogs = state.dogs.sort(
          (a, b) =>
            a.weight
              .split(" - ")
              .map((value) =>
                value.slice(-2) === "kg"
                  ? parseInt(value.slice(0, -2))
                  : parseInt(value)
              )[0] -
            b.weight
              .split(" - ")
              .map((value) =>
                value.slice(-2) === "kg"
                  ? parseInt(value.slice(0, -2))
                  : parseInt(value)
              )[0]
        );
        if (state.filteredDogs.length > 0)
          state.filteredDogs = state.filteredDogs.sort(
            (a, b) =>
              a.weight
                .split(" - ")
                .map((value) =>
                  value.slice(-2) === "kg"
                    ? parseInt(value.slice(0, -2))
                    : parseInt(value)
                )[0] -
              b.weight
                .split(" - ")
                .map((value) =>
                  value.slice(-2) === "kg"
                    ? parseInt(value.slice(0, -2))
                    : parseInt(value)
                )[0]
          );
        break;
    }
  },
  clearDetails: (state) => {
    state.details = {};
  },
  formClearTemperament: (state, action) => {
    state.form = {
      ...state.form,
      temperaments: state.form.temperaments.filter((value) => {
        console.log([value, action.payload]);
        return value.id !== parseInt(action.payload);
      }),
    };
  },
  formHandleName: (state, action) => {
    state.formError = "";
    state.form = {
      ...state.form,
      name: action.payload,
    };
  },
  formSelectTemperament: (state, action) => {
    state.formError = "";
    state.form = {
      ...state.form,
      temperaments:
        state.form.temperaments.filter(
          (value) => value.id === parseInt(JSON.parse(action.payload).id)
        ).length === 1
          ? [...state.form.temperaments]
          : [...state.form.temperaments, JSON.parse(action.payload)],
    };
  },
  formHandleArrayNumbers: (state, action) => {
    const { arrayName, arrayIndex, actionValue } = action.payload;
    state.formError = "";
    state.form = {
      ...state.form,
      [arrayName]: state.form[arrayName].map((value, index) =>
        index === arrayIndex
          ? parseInt(actionValue) >= 0
            ? parseInt(actionValue)
            : 0
          : value
      ),
    };
  },
  formHandleError: (state, action) => {
    state.formError = action.payload;
  },
};

export default appActions;
