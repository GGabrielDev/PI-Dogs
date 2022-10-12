import styled from "styled-components";

export const DetailsCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;

  width: calc(100% - 128px);
  height: fit-content;
  padding: 32px;
  margin: 32px;
  border-radius: 10px;
  background: ${(props) => props.theme.primaryAlt};
  box-shadow: -10px 10px 10px rgba(0, 0, 0, 0.25);
`;

export const DetailsImage = styled.img`
  width: 30%;
  border-radius: 10px;

  order: 0;
  align-self: flex-start;
`;

export const DetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 23px;
  gap: 16px;

  width: 70%;
  height: fit-content;

  background: ${(props) => props.theme.primary};
  border-radius: 10px;

  order: 1;
  align-self: stretch;
`;

export const DetailsTitle = styled.h2`
  font-family: "Ubuntu";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;

  color: white;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const DetailsText = styled.p`
  font-family: "Noto Sans";
  font-style: normal;
  font-size: 24px;

  color: ${(props) => props.theme.gray};

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;
