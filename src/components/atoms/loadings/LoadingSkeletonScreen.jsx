import styled from "styled-components";

export const LoadingSkeletonScreen = () => (
  <Wrapper>
    <Line width="60%" />
    <Line width="40%" />
    <Line width="80%" />
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 16px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% { opacity: 0.4; }
    50% { opacity: 1; }
    100% { opacity: 0.4; }
  }
`;

const Line = styled.div`
  height: 14px;
  background: #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  width: ${(p) => p.width};
`;