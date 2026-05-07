import styled from "styled-components";

export const ErrorMessage = (props) => {
  const { message } = props;

  return (
    <SError>{message}</SError>
  )
}

const SError = styled.p`
  color: red;
  margin-top: 8px;
  text-align: center;
`;