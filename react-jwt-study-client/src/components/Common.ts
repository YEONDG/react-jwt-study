import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #dbb06e;
  height: 100%;
`;

export const Inputs = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 50px;
`;

export const Input = styled.input`
  display: flex;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
`;
