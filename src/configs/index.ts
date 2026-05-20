export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:8000/api/v1/";
// export const BASE_URL = "http://192.168.1.7:8000/api/v1/";
export const AGORA_APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID;
export const SOCKET_BASEURL = process.env.NEXT_PUBLIC_BASE_SOCKET_URL;
export const IS_MULTI_INSTITUTE =
  process.env.NEXT_PUBLIC_MULTI_INSTITUTE || false;

export interface fetchURLProps {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit;
  isFormData?: boolean;
}

export default async function authFetch({
  path,
  method = "GET",
  body,
  isFormData = false,
}: fetchURLProps): Promise<{
  data: any;
  message: string;
  error?: string;
}> {
  try {
    const ACCESS_TOKEN = localStorage?.getItem("ACCESS_TOKEN");
    const headers: any = {};
    ACCESS_TOKEN && (headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`);
    !isFormData && (headers["Content-Type"] = "application/json");
    const options: RequestInit = {
      method: method,
      headers,
      body: body,
    };
    !body && delete options?.body;
    const response = await fetch(`${BASE_URL}/${path}`, options);
    const responseData = await response.json();
    const accessToken =
      responseData?.data?.ACCESS_TOKEN || responseData?.ACCESS_TOKEN;
    accessToken && localStorage?.setItem("ACCESS_TOKEN", accessToken);
    return responseData;
  } catch (error) {
    const err = error as Error;
    return { error: err?.message, data: null, message: "" };
  }
}

export const VAPID_KEY = process.env.FIREBASE_VAPID_KEY;

export { messaging } from "./firebaseConfig";
