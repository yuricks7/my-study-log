import styled from "styled-components";

export const PrimaryButton = (props) => {
  const { children, onClick } = props;

  return (
    <SButton onClick={onClick}>{children}</SButton>
  )
};

const SButton = styled.button`
  background-color: #b3b3b3;
  border-radius: 8px;
  border: none;
  padding: 4px 16px;
  margin: 0px 2px;

  &:hover {
    background-color: #79a8a9;
    color: #fff;
    cursor: pointer;
  }
`;