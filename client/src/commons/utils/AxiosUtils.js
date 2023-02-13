import AuthenticationUtils from "./AuthenticationUtils";
import axios from "axios";
import { notifyError, notifySuccess } from "src/commons/utils/NotifyUtils";

class Request {
  static Axios = class {
    constructor() {}

    setAxios(option) {
      console.log(option, typeof option);
      this.Axios = axios.create({ ...option });
      this.Axios.interceptors.response.use(
        this.handlerResponse,
        this.handlerReject
      );
      this.Axios.interceptors.request.use(this.handlerRequest, this.reject);

      return this.Axios;
    }

    // Abaixo são utilitarios para configuração do Axios
    handlerRequest = (config) => {
      let token = AuthenticationUtils.getToken();
      token ? (config.headers["x-access-token"] = token) : void 0;
      return config;
    };

    reject(error) {
      return Promise.reject(error);
    }

    async handlerResponse(response) {
      if (response?.config?.method?.toUpperCase() !== "GET") {
        if (
          response?.data &&
          (response?.data?.message || response?.data?.msg)
        ) {
          notifySuccess(response?.data?.message || response?.data?.msg);
        }
      }
      if (response?.config?.method?.toUpperCase() !== "POST") {
        if (
          response?.data &&
          (response?.data?.message || response?.data?.msg)
        ) {
          notifySuccess(response?.data?.message || response?.data?.msg);
        }
      }
      return response;
    }

    async handlerReject(error) {
      let response = error?.response;
      let msg = null;
      let haveMsg = false;
      console.log("handlerReject");
      if (response && response?.data) {
        haveMsg = true;
        const data = response?.data;
        const checkHtml = RegExp("<(\"[^\"]*\"|'[^']*'|[^'\">])*>");

        if (checkHtml.test(data)) {
          msg = response.statusText;
        } else if (typeof data == "string") {
          haveMsg = true;
          msg = data;
        } else if (data?.message || data?.msg) {
          haveMsg = true;
          msg = data?.message || data?.msg;
        }
        if (haveMsg) {
          notifyError(msg);
        }
      }
      return Promise.reject(error);
    }
  };

  static create(option) {
    return new this.Axios().setAxios(option);
  }
}

export const Axios = Request.create(
  process.env.DEV && {
    baseURL: process.env.SERVER_API.replace(/['"!@#$%^&*]/g, ""),
  }
);
