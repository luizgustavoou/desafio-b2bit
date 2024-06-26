import { authSelector } from "@/slices/auth-slice";
import { useAppSelector } from "./useAppSelector";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const { user } = useAppSelector(authSelector);

  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    setAuth(!!user);
  }, [user]);

  return { auth };
};
