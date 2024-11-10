import { useEffect, useState } from 'react';
import { getMyPage } from '../apis/mypage';
import { UserProfile } from '../types';

const MyPage = () => {
  const [data, setData] = useState<UserProfile | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const result = await getMyPage();
        console.log(result);
        setData(result.user);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    getProfile();
  }, []);

  if (isLoading) return <div>로딩중</div>;
  return (
    <div>
      <div>{data?.name}</div>
      <div>{data?.age}</div>
    </div>
  );
};

export default MyPage;
