import styled, { css } from "styled-components";

export const Footer = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const FontCSS = css`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 28px;
`;

export const FooterButton = styled.button`
  ${FontCSS}
  border: none;
  background: none;
  width: fit-content;
  height: fit-content;

  transition: ease 0.5s;
  &:disabled {
    color: ${(props) => props.theme.gray};

    transition: ease 0.5s;
  }
`;

export const FooterText = styled.div`
  ${FontCSS}
`;

export const DogsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 32px;

  width: calc(100% - 128px);
  min-height: fit-content;
  height: 100%;
  padding: 64px;
`;

export const DogCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding: 24px;
  border-radius: 10px;

  background: ${(props) => props.theme.primaryAlt};
`;

export const DogImage = styled.img`
  width: 256px;
  height: 256px;

  border-radius: 10px 10px 0px 0px;
`;

export const DogContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;

  width: 224px;
  height: 152px;

  background: ${(props) => props.theme.primary};
  border-radius: 0px 0px 10px 10px;
`;

export const DogBreed = styled.h2`
  width: 100%;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 38px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: white;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const DogText = styled.p`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-align: center;

  color: ${(props) => props.theme.gray};

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.lineNumber ? props.lineNumber : 1)};
  line-clamp: ${(props) => (props.lineNumber ? props.lineNumber : 1)};
  -webkit-box-orient: vertical;
`;
