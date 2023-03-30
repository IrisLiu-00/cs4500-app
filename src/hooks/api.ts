import Axios, { AxiosInstance, Method } from 'axios';
import { Line, StoryDetail, StorySummary, Team, User, UserPatch } from '../types';

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
    patch: async (userId: number, body: UserPatch): Promise<UserPatch> => {
      return this.req('PATCH', `/users/${userId}`, body);
    },
  };

  story = {
    getSearch: async (criteria: string): Promise<StorySummary[]> => this.req('GET', `/stories/search/${criteria}`),
    getRecentGlobal: async (): Promise<StorySummary[]> => this.req('GET', `/stories/recent/global`),
    getRecentForUser: async (userId: number): Promise<StorySummary[]> =>
      this.req('GET', `/stories/recent/user/${userId}`),
    getRecentForTeam: async (teamId: number): Promise<StorySummary[]> =>
      this.req('GET', `/stories/recent/team/${teamId}`),
    get: async (storyId: number): Promise<StoryDetail> => this.req('GET', `/stories/${storyId}`),
    postLine: async (storyId: number, lineText: string): Promise<Line> =>
      this.req('POST', `/stories/${storyId}`, { lineText }),
    deleteLine: async (storyId: number, lineId: number) => this.req('DELETE', `/stories/${storyId}/${lineId}`),
  };

  team = {
    getAll: async (): Promise<Team[]> => this.req('GET', '/teams'),
  };
}

export const API = new APIClient(process.env.REACT_APP_API_BASE);
