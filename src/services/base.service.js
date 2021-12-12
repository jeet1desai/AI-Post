import axios, { AxiosResponse, AxiosError } from "axios";
import { POST_BASE_API_URL } from "../utils/constants";
import { HttpStatusCodes } from "../utils/enums/http-status";

const httpClient = axios.create({
  baseURL: POST_BASE_API_URL,
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    switch (error.response?.status) {
      case HttpStatusCodes.Unauthorized:
        break;
      case HttpStatusCodes.BadRequest:
        break;
      case HttpStatusCodes.NotFound:
        break;
      case HttpStatusCodes.InternalServerError:
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default httpClient;
