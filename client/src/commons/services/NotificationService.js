import {Axios} from "../utils/AxiosUtils";

class NotificationService {
  async getMetadata() {
    const {data} = await Axios.get(`/api/notification/metadata`);
    return data?.content;
  }

  async getNotification({id}) {
    const {data} = await Axios.get(`/api/notification/${id}`);
    return data?.content;
  }

  async getNotificationList() {
    const {data} = await Axios.get(`/api/notification`);
    return data?.content;
  }

  async postNotification(bean) {
    const {data} = await Axios.post(`/api/notification`, bean);
    return data?.content;
  }
}

export default new NotificationService();
