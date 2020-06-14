import axios from "axios";
export const serverIO = {
  data() {
    return {
      body: "",
      created: "",
      finishBy: "",

      finishedOn: "",

      tasks: [],

      finishedTask: {
        body: "",
        created: "",
        finishBy: "",
        finishedOn: ""
      }
    };
  },
  methods: {
    async createTask() {
      let taskData = {
        body: this.body,
        created: new Date().toISOString().split("T")[0],
        finishBy: this.finishBy
      };
      await this.__submitToServer(taskData);
      this.fetchTasks();
    },
    async deleteTask(id) {
      await this.__deleteFromServer(id);
      this.fetchTasks();
    },
    async editTask(id, data) {
      await this.__editOnServer(id, data);
      this.fetchTasks();
    },
    async finishTask(id, data) {
      await this.createFinished(data);
      await this.__finishOnServer(id, this.finishedTask);
      this.fetchTasks();
    },
    async createFinished(data) {
      this.finishedTask.body = data.body;
      this.finishedTask.created = data.created;
      this.finishedTask.finishBy = data.finishBy;
      this.finishedTask.finishedOn = new Date().toISOString().split("T")[0];
    },
    fetchTasks() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/tasks`)
        .then(response => (this.tasks = response.data));
    },
    async __finishOnServer(id, data) {
      await axios.put(
        `${process.env.VUE_APP_BASE_URL}/tasks/finish/${id}`,
        data
      );
    },
    async __submitToServer(data) {
      await axios.post(`${process.env.VUE_APP_BASE_URL}/tasks/post`, data);
    },
    async __deleteFromServer(id) {
      await axios.delete(`${process.env.VUE_APP_BASE_URL}/tasks/delete/${id}`);
    },
    async __editOnServer(id, data) {
      await axios.put(`${process.env.VUE_APP_BASE_URL}/tasks/edit/${id}`, data);
    }
  }
};
