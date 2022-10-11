import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

export const CreateCard = styled.div`
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

export const CreateInfo = styled.div`
  width: 30%;
  border-radius: 10px;

  font-style: normal;
  font-weight: 700;
  font-size: 72px;
  text-align: center;

  color: white;

  order: 0;
  align-self: flex-start;
`;

export const CreateContent = styled.div`
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

export const CreateFlexWrapper = styled.div`
  display: flex;
  flex-flow: ${(props) => (props.flexReverse ? "row-reverse" : "row")} wrap;
  align-items: center;
  gap: 16px;
`;
export const CreateInput = styled.input`
  width: ${(props) => props.width};
  height: 48px;
  padding: 0 16px;
  background: white;
  border: none;
  border-radius: 10px;
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

export const CreateSelect = styled.select`
  width: ${(props) => props.width};
  height: fit-content;
  padding: 8px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const CreateTitle = styled.h2`
  font-family: "Ubuntu";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;

  color: white;

  flex: none;
`;

export const CreateText = styled.p`
  font-family: "Noto Sans";
  font-style: normal;
  font-size: 24px;

  color: ${(props) => props.theme.gray};

  flex: none;
`;

const CreateTemperamentTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  gap: 8px;

  width: fit-content;
  height: fit-content;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: white;
	cursor: pointer;

  background: ${(props) => props.theme.gray};
  border-radius: 10px;
`;

export const CreateTemperamentTag = ({ onClick, id, children }) => {
  return (
    <CreateTemperamentTagWrapper onClick={onClick} id={id}>
      {children} <FaTimes />
    </CreateTemperamentTagWrapper>
  );
};

export const CreateError = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 16px;

  width: calc(100% - 32px);
  height: fit-content;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: white;

  background: red;
  border-radius: 10px;
`;
