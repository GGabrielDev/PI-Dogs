import styled from "styled-components";
import { ButtonCSS } from "../GenericComponents";

export const FilterWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background: #252526a0;
  transition: ease 2s;
`;

export const FilterCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 32px;
  margin: 64px;
  color: white;
  width: 328px;
  height: fit-content;
  background: ${(props) => props.theme.secondary};
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const FilterTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 16px;
  background: ${(props) => props.theme.primaryAlt};
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: white;
`;

export const FilterSortWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: fit-content;
`;

export const FilterSelect = styled.select`
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  padding: 8px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 33px;
`;

export const FilterClear = styled.button`
  ${ButtonCSS};
  padding: 4px 8px;
`;

export const FilterButton = styled.button`
  ${ButtonCSS}
  width: 100%;
  height: fit-content;
  padding: 4px 0;
  font-weight: 500;
`;

export const FilterLine = styled.div`
  width: 100%;
  height: 0;
  border: 2px solid ${(props) => props.theme.primaryAlt};
`;
