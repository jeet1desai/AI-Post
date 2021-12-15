import { AxiosResponse } from "axios";
import httpClient from "./base.service";
import { IPostFetchData } from "../utils/interfaces/post";
import { POST_BASE_API_URL } from "../utils/constants";

const getPostsData = async (
  page: number | null
): Promise<AxiosResponse<IPostFetchData>> =>
  httpClient.get(
    `${POST_BASE_API_URL}/search_by_date?tags=story&page=${page ? page : 0}`
  );

export default { getPostsData };
