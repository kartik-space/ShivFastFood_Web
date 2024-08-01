import { getHistory } from "@/service/Shiv";
import { useQuery } from "@tanstack/react-query";

const useGetHistory = (uid: any) => {
  return useQuery({
    queryKey: ["getHistory", uid],
    queryFn: () => getHistory(uid),
    enabled: !!uid, // Ensure the query is only run when uid is available
  });
};

export default useGetHistory;
