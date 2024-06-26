import axios from "axios";

import { storageService } from "@/services";
import { responseErrorHandler } from "@/network/response-error-handler";
import { baseURL } from "@/network/config";

export const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json;version=v1_web",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = storageService.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => response, responseErrorHandler);
