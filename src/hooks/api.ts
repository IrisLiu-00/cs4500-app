import Axios, { AxiosInstance, Method } from 'axios';
import { Line, StoryDetail, StorySummary, Team, TeamDetail, User, UserPatch, TeamPatch, SignupBody } from '../types';

class APIClient {
  private axios: AxiosInstance;

  constructor(baseURL = '') {
    this.axios = Axios.create({ baseURL: baseURL, withCredentials: true });
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
    signup: async (body: SignupBody): Promise<User> => this.req('POST', '/users/signup', body),
    login: async (body: { username: string; password: string }): Promise<User> =>
      this.req('POST', '/users/login', body),
    logout: async (): Promise<User> => this.req('POST', '/users/logout'),
  };

  story = {
    getSearch: async (criteria: string): Promise<StorySummary[]> => this.req('GET', `/stories/search/${criteria}`),
    getRecentGlobal: async (): Promise<StorySummary[]> => this.req('GET', `/stories/recent/global`),
    getRecentForUser: async (userId: number): Promise<StorySummary[]> =>
      this.req('GET', `/stories/recent/user/${userId}`),
    getRecentForTeam: async (teamId: string): Promise<StorySummary[]> =>
      this.req('GET', `/stories/recent/team/${teamId}`),
    getFeaturesForTeam: async (teamId: string): Promise<StorySummary[]> =>
      this.req('GET', `/stories/features/team/${teamId}`),
    get: async (storyId: number): Promise<StoryDetail> => this.req('GET', `/stories/${storyId}`),
    postLine: async (storyId: number, lineText: string): Promise<Line> =>
      this.req('POST', `/stories/${storyId}`, { lineText }),
    deleteLine: async (storyId: number, lineId: number) => this.req('DELETE', `/stories/${storyId}/${lineId}`),
    toggleFeature: async (storyId: number, teamId: string) =>
      this.req('PATCH', `/stories/${storyId}/features`, { teamId }),
  };

  team = {
    getAll: async (): Promise<Team[]> => this.req('GET', '/teams'),
    get: async (teamId: string): Promise<TeamDetail> => this.req('GET', `/teams/${teamId}`),
    patch: async (teamId: string, body: TeamPatch) => {
      return this.req('PATCH', `/teams/${teamId}`, body);
    },
  };
}

export const API = new APIClient(process.env.REACT_APP_API_BASE);
