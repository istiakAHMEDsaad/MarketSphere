import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axiosInstance';

const fetchJobById = async (id) => {
  const { data } = await axiosInstance.get(`/jobs/jobs/${id}`);
  return data.job;
};

const useJobDetails = (id) => {
  return useQuery({
    queryKey: ['jobDetails', id],
    queryFn: () => fetchJobById(id),
    enabled: !!id, // only run if id exists
    staleTime: 1000 * 60 * 2,
  });
};

export default useJobDetails;
