import axios from 'axios';

export const login = async (username: string, password: string) => {
  const result = await axios.post('http://localhost:5000/login', {
    username,
    password,
  });
  console.log(result);
  return result.data;
};
