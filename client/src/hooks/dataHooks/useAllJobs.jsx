import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axiosInstance';

const fetchAllJob = async () => {
  const { data } = await axiosInstance.get('/jobs/jobs');
  return data.jobs;
};
const useAllJobs = () => {
  return useQuery({
    queryKey: ['allJobs'],
    queryFn: fetchAllJob,
    staleTime: 1000 * 60 * 2,
  });
};

export default useAllJobs;
