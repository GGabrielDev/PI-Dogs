import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
  STATUS,
  formClearTemperament,
  formHandleArrayNumbers,
  formHandleName,
  formSelectTemperament,
  selectForm,
  selectFormError,
  selectStatus,
  selectTemperaments,
} from "../../features/appSlice";
import { DashboardWrapper } from "../../components/GenericComponents";
import {
  CreateCard,
  CreateContent,
  CreateError,
  CreateFlexWrapper,
  CreateInfo,
  CreateInput,
  CreateSelect,
  CreateTemperamentTag,
  CreateText,
  CreateTitle,
} from "./components";
import { useEffect } from "react";

const DogsCreatePage = () => {
  const dispatch = useDispatch();
  const form = useSelector(selectForm);
  const formError = useSelector(selectFormError);
  const status = useSelector(selectStatus);
  const temperaments = useSelector(selectTemperaments);
  const navigate = useNavigate();

  const temperamentOption = (temperament) => (
    <option key={temperament.id} value={JSON.stringify(temperament)}>
      {temperament.name}
    </option>
  );

  let temperamentTags = form.temperaments.map((value) => (
    <CreateTemperamentTag
      key={`TAG-${value.id}`}
      id={value.id}
      onClick={() => dispatch(formClearTemperament(value.id))}
    >
      {value.name}
    </CreateTemperamentTag>
  ));

  const temperamentSelect = [
    <option key={0} value="deselected" disabled>
      Select Temperament
    </option>,
    ...temperaments.map((temperament) => temperamentOption(temperament)),
  ];

  useEffect(() => {
    if (status === STATUS.CREATED) navigate("/dashboard");
  }, [status]);

  return status === STATUS.START ? (
    <Navigate to="/" />
  ) : (
    <DashboardWrapper>
      <CreateCard>
        <CreateInfo>New Breed</CreateInfo>
        <CreateContent>
          <CreateFlexWrapper>
            <CreateTitle>Name: </CreateTitle>
            <CreateInput
              placeholder="Write breed name"
              value={form.name}
              onChange={(e) => dispatch(formHandleName(e.target.value))}
            />
          </CreateFlexWrapper>
          <CreateFlexWrapper>
            <CreateText>
              <strong>Temperaments: </strong>
            </CreateText>
            <CreateSelect
              value="deselected"
              width="256px"
              onChange={(e) => dispatch(formSelectTemperament(e.target.value))}
            >
              {temperamentSelect}
            </CreateSelect>
          </CreateFlexWrapper>
          <CreateFlexWrapper>{temperamentTags}</CreateFlexWrapper>
          <CreateFlexWrapper>
            <CreateText>
              <strong>Weight:</strong>
            </CreateText>
            <CreateInput
              width="64px"
              value={form.weight[0]}
              type="number"
              onChange={(e) =>
                dispatch(
                  formHandleArrayNumbers({
                    arrayName: "weight",
                    arrayIndex: 0,
                    actionValue: e.target.value,
                  })
                )
              }
            />
            <CreateText>-</CreateText>
            <CreateInput
              width="64px"
              value={form.weight[1]}
              type="number"
              onChange={(e) =>
                dispatch(
                  formHandleArrayNumbers({
                    arrayName: "weight",
                    arrayIndex: 1,
                    actionValue: e.target.value,
                  })
                )
              }
            />
            <CreateText>kg</CreateText>
          </CreateFlexWrapper>
          <CreateFlexWrapper>
            <CreateText>
              <strong>Height:</strong>
            </CreateText>
            <CreateInput
              width="64px"
              value={form.height[0]}
              type="number"
              onChange={(e) =>
                dispatch(
                  formHandleArrayNumbers({
                    arrayName: "height",
                    arrayIndex: 0,
                    actionValue: e.target.value,
                  })
                )
              }
            />
            <CreateText>-</CreateText>
            <CreateInput
              width="64px"
              value={form.height[1]}
              type="number"
              onChange={(e) =>
                dispatch(
                  formHandleArrayNumbers({
                    arrayName: "height",
                    arrayIndex: 1,
                    actionValue: e.target.value,
                  })
                )
              }
            />
            <CreateText>cm</CreateText>
          </CreateFlexWrapper>
          <CreateFlexWrapper>
            <CreateText>
              <strong>Life Span:</strong>
            </CreateText>
            <CreateInput
              width="64px"
              value={form.age[0]}
              type="number"
              onChange={(e) =>
                dispatch(
                  formHandleArrayNumbers({
                    arrayName: "age",
                    arrayIndex: 0,
                    actionValue: e.target.value,
                  })
                )
              }
            />
            <CreateText>-</CreateText>
            <CreateInput
              width="64px"
              value={form.age[1]}
              type="number"
              onChange={(e) =>
                dispatch(
                  formHandleArrayNumbers({
                    arrayName: "age",
                    arrayIndex: 1,
                    actionValue: e.target.value,
                  })
                )
              }
            />
            <CreateText>years</CreateText>
          </CreateFlexWrapper>
          {formError.length > 0 ? (
            <CreateError>
              <FaTimes /> {formError}
            </CreateError>
          ) : null}
        </CreateContent>
      </CreateCard>
    </DashboardWrapper>
  );
};

export default DogsCreatePage;
