import { getAuthAxios } from './authAxios';

export const getMyPage = async () => {
  const access = localStorage.getItem('accessToken') as string;
  console.log('Access Token:', access);
  const authAxios = getAuthAxios(access);
  const result = await authAxios.get('/mypage');
  console.log(result, '이건뭘까요');
  return result.data;
};
