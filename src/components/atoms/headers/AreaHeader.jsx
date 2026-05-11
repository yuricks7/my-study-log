import styled from "styled-components";

export const AreaHeader = (props) => {
  const { children } = props;

  return (
    <SH2>{children}</SH2>
  )
};

const SH2 = styled.h2`
  margin-top: 8px;
  margin-bottom: 0;
`;