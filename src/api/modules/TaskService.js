import API from "../interface";

export default {
  async __fetchFromServer() {
    return await API().get(`/tasks`);
  },

  async __submitToServer(data) {
    return await API().post(`/tasks/post`, data);
  },

  async __editOnServer(id, data) {
    return await API().put(`/tasks/edit/${id}`, data);
  },

  async __deleteFromServer(id) {
    return await API().delete(`/tasks/delete/${id}`);
  }
};
