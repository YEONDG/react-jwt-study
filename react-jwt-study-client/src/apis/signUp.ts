import axios from 'axios';

export const signUp = async (
  username: string,
  password: string,
  name: string,
  age: number
) => {
  const result = await axios.post('http://localhost:5000/register', {
    username,
    password,
    name,
    age,
  });
  return result.data;
};
