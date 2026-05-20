import { BASE_URL } from "configs";
import { useEffect, useState } from "react";
import useMounted from "./useMounted";
import useAuth from "./useAuth";
import { handleValidFormData } from "utils";

const useFetch = (path?: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState<number | undefined>();
  const { user } = useAuth();

  const isMounted = useMounted();

  const fetchData = async ({
    path,
    method,
    isFormData = false,
    body,
  }: {
    path?: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    isFormData?: boolean;
    body?: any;
  }) => {
    try {
      if (!path) return;
      setLoading(true);

      let ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

      let fullUrl = window.location.href;

      let API_URL = new URL(`${BASE_URL}${path}`);

      if (
        fullUrl?.includes("/superadmin/") &&
        ["SUPER_ADMIN", "MANAGER"]?.includes(String(user?.role?.toUpperCase()))
      ) {
        API_URL.searchParams.set("getAllInstituteData", "true");
      }

      const headers: HeadersInit = {};
      ACCESS_TOKEN && (headers["authorization"] = `Bearer ${ACCESS_TOKEN}`);
      !isFormData && (headers["Content-Type"] = "application/json");
      const options: RequestInit = {
        method: method,
        headers,
        body: body,
      };
      !body && delete options?.body;

      const response = await fetch(API_URL, options);

      isMounted && setStatusCode(response?.status);

      let data = await response.json();

      const accessToken = data?.data?.ACCESS_TOKEN || data?.ACCESS_TOKEN;
      if (accessToken) {
        localStorage?.setItem("ACCESS_TOKEN", accessToken);
      }

      isMounted && setData(data);
      return { data, status: response?.status };
    } catch (error) {
      return { data: error, status: 400 };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ path: path, method: "GET" });
  }, [path, isMounted, fetchData]);

  return {
    data,
    loading,
    mutate: fetchData,
    statusCode,
  };
};

export default useFetch;
