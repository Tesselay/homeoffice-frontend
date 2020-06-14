import API from "../interface";

export default {
  async __submitToServer(id, data) {
    return await API().put(`/tasks/finish/${id}`, data);
  }
};
