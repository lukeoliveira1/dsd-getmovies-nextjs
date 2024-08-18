import { baseAPI } from "./api";

export default class AuthService {
  private axiosClient = baseAPI;

  async loginByGithub(code: string) {
    try {
      const response = await this.axiosClient.post(
        "/auth/dj-rest-auth/github/",
        {
          code,
        }
      );
      const accessToken = response.data.key;

      const responseUser = await this.getUser(accessToken);

      return { accessToken, user: responseUser };
    } catch (error: any) {
      return error.response;
    }
  }

  async loginByGoogle(code: string) {
    try {
      const response = await this.axiosClient.post(
        "/auth/dj-rest-auth/google/",
        {
          code,
        }
      );
      const accessToken = response.data.key;

      const responseUser = await this.getUser(accessToken);
      return { accessToken, user: responseUser };
    } catch (error: any) {
      return error.response;
    }
  }

  async getUser(accessToken: string) {
    try {
      const response = await this.axiosClient.get("auth/token/get-user/", {
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
}
