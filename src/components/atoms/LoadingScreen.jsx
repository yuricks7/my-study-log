import styled from "styled-components";

export const LoadingScreen = () => {
  return (
    <SWrapper>
      <SSpinner />
      <p>Now Loading...</p>
    </SWrapper>
  )
}

const SWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const SSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;