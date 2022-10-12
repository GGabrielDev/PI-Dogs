import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiRefresh } from "react-icons/hi";
import { FaFilter, FaSearch, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  clearDetails,
  createDog,
  fillByName,
  fillDogs,
  formHandleArrayNumbers,
  formHandleError,
  selectForm,
  selectStatus,
  STATUS,
} from "../../features/appSlice";
import {
  AppLogo,
  NavBar,
  NavButton,
  NavMenu,
  NavMenuItem,
  NavSearch,
  NavSeachButton,
  NavTitle,
} from "./components";
import { SpinnerIcon } from "../GenericComponents";
import Filter from "../Filter";

const NavigationBar = () => {
  const [state, setState] = useState({
    query: "",
    filterShown: false,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const form = useSelector(selectForm);

  const closeFilter = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.target === e.currentTarget) {
      setState({ ...state, filterShown: false });
    }
  };

  const goToDashboard = (e) => {
    e.preventDefault();

    dispatch(clearDetails());
    navigate("/dashboard");
  };

  const goToCreate = (e) => {
    e.preventDefault();

    navigate("/dashboard/create");
  };

  const submitForm = (e) => {
    e.preventDefault();

    const RegExName = /^[a-zA-Z\s]*$/;
    if (form.name.length === 0) {
      dispatch(formHandleError("You must write a breed name"));
      return null;
    }
    if (!RegExName.test(form.name)) {
      dispatch(
        formHandleError("The breed name should only contain letters and spaces")
      );
      return null;
    }
    if (form.temperaments.length === 0) {
      dispatch(formHandleError("You must select at least one temperament"));
      return null;
    }
    if (form.weight[0] === 0 || form.weight[1] === 0) {
      dispatch(formHandleError("The values of weight must be higher than 0"));
      return null;
    }
    if (form.height[0] === 0 || form.height[1] === 0) {
      dispatch(formHandleError("The values of height must be higher than 0"));
      return null;
    }
    if (form.age[0] === 0 || form.age[1] === 0) {
      dispatch(
        formHandleError("The values of life span must be higher than 0")
      );
      return null;
    }

    if (form.weight[0] > form.weight[1]) {
      let bufferWeight = form.weight.map((value) => value);

      dispatch(
        formHandleArrayNumbers({
          arrayName: "weight",
          arrayIndex: 0,
          actionValue: bufferWeight[1],
        })
      );
      dispatch(
        formHandleArrayNumbers({
          arrayName: "weight",
          arrayIndex: 1,
          actionValue: bufferWeight[0],
        })
      );
    }
    if (form.height[0] > form.height[1]) {
      let bufferHeight = form.height.map((value) => value);

      dispatch(
        formHandleArrayNumbers({
          arrayName: "height",
          arrayIndex: 0,
          actionValue: bufferHeight[1],
        })
      );
      dispatch(
        formHandleArrayNumbers({
          arrayName: "height",
          arrayIndex: 1,
          actionValue: bufferHeight[0],
        })
      );
    }
    if (form.age[0] > form.age[1]) {
      let bufferAge = form.age.map((value) => value);

      dispatch(
        formHandleArrayNumbers({
          arrayName: "age",
          arrayIndex: 0,
          actionValue: bufferAge[1],
        })
      );
      dispatch(
        formHandleArrayNumbers({
          arrayName: "age",
          arrayIndex: 1,
          actionValue: bufferAge[0],
        })
      );
    }

    dispatch(createDog());
  };

  return (
    <>
      {state.filterShown && location.pathname === "/dashboard" ? (
        <Filter onClick={closeFilter} />
      ) : null}
      <NavBar>
        <NavTitle onClick={goToDashboard}>
          <AppLogo>DOGS APP</AppLogo>
        </NavTitle>
        <NavMenu>
          {location.pathname === "/dashboard" ? (
            <>
              <NavMenuItem>
                <NavButton
                  onClick={() => setState({ ...state, filterShown: true })}
                >
                  <FaFilter />
                </NavButton>
              </NavMenuItem>
              <NavMenuItem>
                <NavButton onClick={() => dispatch(fillDogs())}>
                  <HiRefresh />
                </NavButton>
              </NavMenuItem>
            </>
          ) : null}
          {!(location.pathname === "/dashboard") ? (
            <NavMenuItem onClick={goToDashboard}>
              <NavButton primary>
                <FaAngleLeft /> Go Back
              </NavButton>
            </NavMenuItem>
          ) : null}
          {!(location.pathname === "/dashboard/create") ? (
            <NavMenuItem onClick={goToCreate}>
              <NavButton>New Breed</NavButton>
            </NavMenuItem>
          ) : null}
          {location.pathname === "/dashboard" ? (
            <NavMenuItem>
              <NavSearch
                placeholder="Search Here"
                value={state.query}
                onChange={(e) => setState({ ...state, query: e.target.value })}
              />
              <NavSeachButton
                disabled={state.query.length <= 0 || status === STATUS.LOADING}
                onClick={() => {
                  dispatch(fillByName(state.query));
                  setState({ ...state, query: "" });
                }}
              >
                {status === STATUS.LOADING ? <SpinnerIcon /> : <FaSearch />}
              </NavSeachButton>
            </NavMenuItem>
          ) : null}
          {location.pathname === "/dashboard/create" ? (
            <NavMenuItem onClick={submitForm}>
              <NavButton>
                Submit Breed!{" "}
                {status === STATUS.LOADING ? <SpinnerIcon /> : <FaAngleRight />}
              </NavButton>
            </NavMenuItem>
          ) : null}
        </NavMenu>
      </NavBar>
    </>
  );
};

export default NavigationBar;
