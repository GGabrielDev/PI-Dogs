import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import {
  FILTER,
  SORT,
  clearFilter,
  clearSort,
  filterByIsLocal,
  filterByTemperament,
  selectFiltered,
  selectSortStatus,
  selectTemperaments,
  sortByName,
  sortByWeight,
} from "../../features/appSlice";
import {
  FilterWrapper,
  FilterCard,
  FilterLine,
  FilterTitle,
  FilterSelect,
  FilterSortWrapper,
  FilterButton,
} from "./components";

const Filter = ({ onClick }) => {
  const [state, setState] = useState({
    temperamentFilter: "",
    isLocalFilter: "",
  });
  const dispatch = useDispatch();
  const sortStatus = useSelector(selectSortStatus);
  const filtered = useSelector(selectFiltered);
  const temperaments = useSelector(selectTemperaments);

  const temperamentSelect = [
    <option key={0} value="deselected" disabled>
      Filter by Temperament
    </option>,
    ...temperaments.map((value) => (
      <option key={value.id} value={value.id}>
        {value.name}
      </option>
    )),
  ];

  const submitTemperamentFilter = (e) => {
    e.preventDefault();

    setState({ ...state, temperamentFilter: e.target.value });
    dispatch(filterByTemperament(e.target.value));
  };

  const submitIsLocalFilter = (e) => {
    e.preventDefault();

    setState({ ...state, isLocalFilter: e.target.value });
    dispatch(filterByIsLocal(e.target.value));
  };

  const submitNameSort = (e) => {
    e.preventDefault();

    dispatch(sortByName());
  };

  const submitWeightSort = (e) => {
    e.preventDefault();

    dispatch(sortByWeight());
  };

  return (
    <FilterWrapper onClick={onClick}>
      <FilterCard>
        <FilterTitle>Filter and Sort</FilterTitle>
        <FilterSortWrapper>
          <FilterSelect
            value={
              filtered === FILTER.TEMPERAMENT
                ? state.temperamentFilter
                : "deselected"
            }
            onChange={submitTemperamentFilter}
          >
            {temperamentSelect}
          </FilterSelect>
          <FilterSelect
            value={
              filtered === FILTER.ISLOCAL ? state.isLocalFilter : "deselected"
            }
            onChange={submitIsLocalFilter}
          >
            <option value="deselected" disabled>
              Filter by Local Files
            </option>
            <option value="true">Is local</option>
            <option value="false">Is from API</option>
          </FilterSelect>
          <FilterButton
            disabled={filtered === FILTER.UNFILTERED}
            onClick={() => dispatch(clearFilter())}
          >
            Clear Filter
          </FilterButton>
        </FilterSortWrapper>
        <FilterLine />
        <FilterSortWrapper>
          <FilterButton primary onClick={submitNameSort}>
            {sortStatus === SORT.ALPHABETICAL ||
            sortStatus === SORT.REVERSE_ALPHABETICAL ? (
              <>
                <FaCheck />
                <p> Sort by Name: </p>
                {sortStatus}
              </>
            ) : (
              <p>Sort by Name</p>
            )}
          </FilterButton>
          <FilterButton primary onClick={submitWeightSort}>
            {sortStatus === SORT.WEIGHT ||
            sortStatus === SORT.REVERSE_WEIGHT ? (
              <>
                <FaCheck />
                <p> Sort by Weight: </p>
                {sortStatus}
              </>
            ) : (
              <p>Sort by Weight</p>
            )}
          </FilterButton>
          <FilterButton
            disabled={sortStatus === SORT.UNSORTED}
            onClick={() => dispatch(clearSort())}
          >
            Clear Sort
          </FilterButton>
        </FilterSortWrapper>
      </FilterCard>
    </FilterWrapper>
  );
};
export default Filter;
