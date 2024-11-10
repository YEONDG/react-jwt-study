import styled from 'styled-components';
import { Form, Input, Inputs, Title, Wrapper } from '../components/Common';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../apis/login';
import { useForm } from '../hooks/useForm';
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [username, onChangeUsername] = useForm<string>();
  const [password, onChangePassword] = useForm<string>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useNavigate();

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await login(username, password);
      const { accessToken, refreshToken } = result;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      router('/mypage');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('로그인 요청 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Wrapper>
      <Title>로그인하기</Title>
      <Form>
        <Inputs>
          <Input
            placeholder='아이디'
            value={username}
            onChange={onChangeUsername}
          />
          <Input
            placeholder='비밀번호'
            type='password'
            value={password}
            onChange={onChangePassword}
          />
        </Inputs>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <Button onClick={onClick}>로그인</Button>
      </Form>
      <CustomLink to='signup'>회원가입하기</CustomLink>
    </Wrapper>
  );
};

export default Home;

const Button = styled.button`
  display: flex;
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  margin-top: 10px;
  justify-content: center;
`;

const ErrorText = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

const CustomLink = styled(Link)`
  margin-top: 20px;
  color: black;
  text-decoration: none;
  &:visited {
    color: black;
    text-decoration: none;
  }
`;
