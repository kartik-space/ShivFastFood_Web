import { fetchItems } from '@/service/Shiv';
import { useQuery } from '@tanstack/react-query';

const useGetItems = () => {
  return useQuery({
    queryKey: ['menuItems'],
    queryFn: fetchItems
  });
};

export default useGetItems;
