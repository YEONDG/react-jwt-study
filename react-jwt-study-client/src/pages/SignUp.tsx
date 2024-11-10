import styled from 'styled-components';
import { Inputs, Title, Wrapper, Form, Input } from '../components/Common';
import { useForm } from '../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../apis/signUp';

const SignUp = () => {
  const [username, onChangeUsername] = useForm<string>();
  const [password, onChangePassword] = useForm<string>();
  const [name, onChangeName] = useForm<string>();
  const [age, onChangeAge] = useForm<number>();
  const router = useNavigate();

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signUp(username, password, name, age);
    router('/');
  };
  return (
    <Wrapper>
      <Title>회원가입</Title>
      <Form>
        <Inputs>
          <Input
            placeholder='아이디'
            type='text'
            value={username}
            onChange={onChangeUsername}
          />
          <Input
            placeholder='비밀번호'
            type='password'
            value={password}
            onChange={onChangePassword}
          />
          <Input
            placeholder='이름'
            type='text'
            value={name}
            onChange={onChangeName}
          />
          <Input
            placeholder='나이'
            type='number'
            value={age}
            onChange={onChangeAge}
          />
        </Inputs>
        <Button onClick={onClick}>가입</Button>
      </Form>
      <CustomLink to='/'>로그인하기</CustomLink>
    </Wrapper>
  );
};
export default SignUp;

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

const CustomLink = styled(Link)`
  margin-top: 20px;
  color: black;
  text-decoration: none;
  &:visited {
    color: black;
    text-decoration: none;
  }
`;
