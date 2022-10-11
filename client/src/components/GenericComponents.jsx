import styled, { css, keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

export const AppFrame = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 124px);
  padding: 0 calc((100vw - 1280px) / 2);
  border-radius: 10px;
`;

const SpinnerKeyframes = keyframes`
	from {
		transform: rotate(0deg);
	} to {
		transform: rotate(360deg);
	}
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #ff5cb9;
  animation: ${SpinnerKeyframes} 1s linear infinite;
  border-radius: 50%;

  transition: ease 0.5s;
`;

export const SpinnerIcon = styled(FaSpinner)`
  animation: ${SpinnerKeyframes} 1s linear infinite;
  transition: ease 0.5s;
`;

export const DashboardFrame = styled.div`
  width: 100%;

  background-color: ${(props) => props.theme.gray};
`;

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: calc(100vh - 128px);
  height: fit-content;
  background: ${(props) => props.theme.primary};
`;

export const ButtonCSS = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 12px;

  background: ${(props) =>
    props.primary ? props.theme.primary : props.theme.primaryAlt};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 4px solid
    ${(props) => (props.primary ? "white" : props.theme.primaryAlt)};

  flex: none;
  order: 2;
  flex-grow: 0;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  text-decoration: none;
  line-height: 33px;
  color: white;

  transition: ease 0.5s;

  &:hover {
    background: white;
    color: ${(props) =>
      props.primary ? props.theme.primary : props.theme.primaryAlt};
    border: 4px solid
      ${(props) =>
        props.primary ? props.theme.primary : props.theme.primaryAlt};
    transition: ease 0.5s;
  }
  &:disabled {
    background: ${(props) => props.theme.secondaryAlt};
    color: ${(props) => props.theme.lightGray};
    transition: ease 0.5s;
  }
`;
