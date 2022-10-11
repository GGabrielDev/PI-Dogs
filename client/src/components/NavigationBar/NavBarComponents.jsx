import styled from "styled-components";
import { ButtonCSS } from "../GenericComponents";

export const NavBar = styled.nav`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  width: 100%;
  height: 124px;
  justify-content: space-between;
  background: ${(props) => props.theme.gray};
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.25);
`;

export const AppLogo = styled.h1`
  font-family: "Ubuntu";
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 74px;
  padding: 0 32px;

  color: ${(props) => props.theme.primaryAlt};
`;

export const NavTitle = styled.button`
  display: flex;
  height: 100%;
  width: fit-content;
  background: none;
  border: none;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
`;

export const NavMenu = styled.ul`
  display: flex;
  gap: 24px;
  align-items: center;
  margin-right: 32px;
  list-style: none;
  text-align: center;
`;

export const NavMenuItem = styled.li`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const NavButton = styled.button`
  ${ButtonCSS}
  height: 48px;
`;

export const NavSearch = styled.input`
  width: 292px;
  height: 48px;
  padding: 0 16px;
  background: white;
  border: none;
  border-radius: 10px 0 0 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  color: ${(props) => props.theme.gray};

  &:focus {
    border: none;
  }
`;

export const NavSeachButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: fit-content;
  padding: 0 12px;
  font-size: 28px;
  font-weight: 700;
  color: white;
  background: ${(props) => props.theme.primaryAlt};
  border: none;
  border-radius: 0 10px 10px 0;
  transition: ease 0.5s;

  &:hover {
    color: ${(props) => props.theme.primaryAlt};
    background: white;
    transition: ease 0.5s;
  }

  &:disabled {
    color: ${(props) => props.theme.gray};
    background: ${(props) => props.theme.lightGray};
    transition: ease 0.5s;
  }
`;
