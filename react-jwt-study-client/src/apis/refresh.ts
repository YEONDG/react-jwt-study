import axios from 'axios';

export const getNewRefreshToken = async () => {
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');

  const result = await axios.post('http://localhost:5000/refresh', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'refresh-token': refreshToken,
    },
  });
  const newAccessToken = result.data.accessToken;
  localStorage.setItem('accessToken', newAccessToken);
  return newAccessToken;
};
