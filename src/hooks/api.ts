import Axios, { AxiosInstance, Method } from 'axios';
import { StoryDetail, User } from '../types';

class APIClient {
  private axios: AxiosInstance;

  constructor(baseURL = '') {
    this.axios = Axios.create({ baseURL: baseURL });
  }

  private async req<T>(method: Method, url: string, body?: any, params?: any): Promise<T> {
    const res = (await this.axios.request({ method, url, data: body, params })).data;
    return res;
  }

  user = {
    get: async (userId?: number): Promise<User> => {
      return userId !== undefined ? this.req('GET', `/users/${userId}`) : this.req('GET', `/users`);
    },
  };

  story = {
    get: async (storyId: number): Promise<StoryDetail> => this.req('GET', `/stories/${storyId}`),
    postLine: async (storyId: number, lineText: string): Promise<StoryDetail> =>
      this.req('POST', `/stories/${storyId}`, { lineText }),
  };
}

export const API = new APIClient(process.env.REACT_APP_API_BASE);
