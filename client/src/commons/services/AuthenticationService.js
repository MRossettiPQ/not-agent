import { Axios } from "../utils/AxiosUtils";

class AuthService {
  async login({ bean }) {
    const { data } = await Axios.post(`/api/auth/login`, bean);
    return data?.content;
  }

  async register({ bean }) {
    const { data } = await Axios.post(`/api/auth/register`, bean);
    return data?.content;
  }

  async context() {
    const { data } = await Axios.get(`/api/auth/context`);
    return data?.content;
  }
}

export default new AuthService();
