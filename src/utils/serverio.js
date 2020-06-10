import axios from "axios";
import { server } from "../utils/helper";

export const serverIO = {
	data() {
		return {
			body: "",
			created: "", 
			finishBy: "",
			done: false,
			finishedOn: "",
			tasks: [],
		};
	},
	methods: {
		async createTask() {
			let taskData = {
				body: this.body,
				created: new Date().toISOString().split('T')[0], 
				finishBy: this.finishBy,
				done: this.done,
				finishedOn: this.finishedOn,
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
		fetchTasks() {
			axios.get(`${server.baseURL}/tasks`)
				.then(response => (this.tasks = response.data));
		},
		async __submitToServer(data) {
			await axios.post(`${server.baseURL}/tasks/post`, data);
		},
		async __deleteFromServer(id) {
			await axios.delete(`${server.baseURL}/tasks/delete/${id}`);
		},
		async __editOnServer(id, data) {
			await axios.put(`${server.baseURL}/tasks/edit/${id}`, data);
		}
	}
}