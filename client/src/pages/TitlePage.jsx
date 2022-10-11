import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  STATUS,
  toggleDummy,
  selectDummy,
  selectStatus,
  fillState,
} from "../features/appSlice";
import {
  TitleFrame,
  TitleDetailsWrapper,
  TitleDetails,
  TitleText,
  TitleButton,
  ButtonWrapper,
  SmallText,
} from "../components/TitleComponents";
import { Spinner } from "../components/GenericComponents";

const TitlePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dummy = useSelector(selectDummy);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      navigate("/dashboard");
    }
  }, [status]);

  return (
    <TitleFrame>
      <TitleDetailsWrapper>
        <TitleDetails>
          <SmallText>Welcome, to the</SmallText>
          <TitleText>DOGS APP</TitleText>
          {status === STATUS.LOADING ? (
            <Spinner />
          ) : (
            <ButtonWrapper>
              <TitleButton primary onClick={() => dispatch(fillState())}>
                Start Here
              </TitleButton>
              <TitleButton onClick={() => dispatch(toggleDummy())}>
                Dummy {dummy ? <FaCheck /> : <FaTimes />}
              </TitleButton>
            </ButtonWrapper>
          )}
        </TitleDetails>
      </TitleDetailsWrapper>
    </TitleFrame>
  );
};

export default TitlePage;
