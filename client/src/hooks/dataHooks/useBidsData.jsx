import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axiosInstance';
import useAuth from '../useAuth';

const getBidsData = async (email) => {
  const { data } = await axiosInstance.get(`/bids/${email}`);
  return data.bids;
};

const useBidsData = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['myBids', user?.email],
    queryFn: () => getBidsData(user?.email),
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 2,
  });
};

export default useBidsData;
