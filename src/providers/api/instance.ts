import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getItem } from "@/utils/persistentStorage";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_MAIN_BACKEND_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export type BaseURL = "default" | "auth";

const instancesURL: Record<BaseURL, string | undefined> = {
  default: import.meta.env.VITE_TANTOR_AUTH_URL,
  auth: import.meta.env.VITE_TANTOR_AUTH_URL,
};

interface InstanceConfig extends AxiosRequestConfig {
  base?: BaseURL;
}

export const createInstance = ({
  base = "default",
  ...config
}: InstanceConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: instancesURL[base],
    timeout: 60000,
    headers: {
      "Content-Type": "application/json",
    },
    ...config,
  });

  instance.interceptors.request.use(
    async (config) => {
      try {
        const token: string = getItem("token");

        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        } as any;
      } catch (e) {
        console.error(e);
      }
      return config;
    },
    (error): any => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error): Promise<any> => await Promise.reject(error)
  );

  return instance;
};
