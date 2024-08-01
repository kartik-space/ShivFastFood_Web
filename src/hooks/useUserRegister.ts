import { useMutation } from "@tanstack/react-query";
import { register } from "@/service/Shiv"; // Ensure the correct import path

const useRegisterUser = () => {
  return useMutation({
    mutationFn: ({ uid }: any) => register(uid),
    onSuccess: (data) => {
      console.log("User registered successfully:", data);
    },
    onError: (error) => {
      console.error("Error registering user:", error);
    },
  });
};

export default useRegisterUser;
