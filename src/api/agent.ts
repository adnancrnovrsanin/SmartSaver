import {
  AuthResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
} from "@/models/user";
import { store } from "@/stores/store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status, headers } = error.response as AxiosResponse;

    if (status) {
      switch (status) {
        case 400:
          toast.error(data);
          break;
        case 401:
          if (
            status === 401 &&
            headers["www-authenticate"]?.startsWith(
              'Bearer error="invalid_token"'
            )
          ) {
            store.userStore.logout();
            toast.info("Session expired - please login again");
            break;
          }
          toast.error("Error code 401: Unauthorized");
          break;
        case 403:
          toast.error("Error code 403: Forbidden");
          break;
        case 404:
          toast.error("Error code 404: Not found");
          break;
        case 500:
          store.commonStore.setServerError(data);
          // router navigates to /server-error
          break;
      }
    }

    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const AccountRequests = {
  current: () => requests.get<AuthResponseDto>("/account"),
  login: (user: LoginRequestDto) =>
    requests.post<AuthResponseDto>("/account/login", user),
  register: (user: RegisterRequestDto) =>
    requests.post<AuthResponseDto>("/account/register", user),
};

const agent = {
  AccountRequests,
};

export default agent;
