import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie, setCookie } from "cookies-next";
import { useEffect, useCallback } from "react";
import { queryKey } from "src/constants/queryKey";

export type Scheme = "light" | "dark";
type SetScheme = (scheme: Scheme) => void;

const useScheme = (): [Scheme, SetScheme] => {
  const queryClient = useQueryClient();

  const { data } = useQuery<Scheme>({
    queryKey: queryKey.scheme(),
    enabled: false,
    initialData: "light",
  });

  const scheme = data || "light";

  const setScheme: SetScheme = useCallback((newScheme: Scheme) => {
    setCookie("scheme", newScheme);
    queryClient.setQueryData(queryKey.scheme(), newScheme);
  }, [queryClient]); // queryClient을 종속성 배열에 추가

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedScheme = getCookie("scheme") as Scheme | undefined;
    setScheme(savedScheme || "light");
  }, [setScheme]); // setScheme을 종속성 배열에 추가

  return [scheme, setScheme];
};

export default useScheme;
