import styled, { css } from "styled-components";
import titleBg from "../assets/title-bg.png";
import { ButtonCSS } from "./GenericComponents";

export const TitleFrame = styled.div`
  width: 100%;
  min-height: 100vh;
  border-radius: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  background: linear-gradient(
      115.15deg,
      rgba(215, 149, 101, 0) 40.83%,
      #d79565 72.31%,
      #d79565 100%
    ),
    url(${titleBg});
  background-size: cover;
`;

export const TitleDetailsWrapper = styled.div`
  width: 50%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  width: fit-content;
  height: fit-content;
`;

export const SmallText = styled.p`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  color: white;
`;

export const TitleText = styled.h1`
  font-family: "Ubuntu";
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 74px;
  color: ${(props) => props.theme.gray};
`;

export const TitleButton = styled.button`
  ${ButtonCSS}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  gap: 12px;
`;
