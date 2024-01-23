import { useContext } from "react";
import { LoadingContext } from "../context/context";


export const useLoading = () => {
  const { loading, setLoading } = useContext(LoadingContext);

  return { loading, setLoading };
};