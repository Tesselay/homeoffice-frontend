import TaskService from "../../api/modules/TaskService";
import FinishedTaskService from "../../api/modules/FinishedTaskService";

const state = () => ({
	all: []
})

// getters
const getters = {
	getAllTasks: state => {
		return state.all
	}
}

// actions
const actions = {
	fetchFromServer ({ commit }) {
		TaskService.__fetchFromServer().then(response => (commit('setTasks', response.data)))
	},
	async createTask({ commit },  data) {
		let taskData = {
		  body: data.body,
		  created: new Date().toISOString().split("T")[0],
		  finishBy: data.finishBy
		};
		await TaskService.__submitToServer(taskData);
		TaskService.__fetchFromServer().then(response => (commit('setTasks', response.data)))
	},
	async deleteTask({ commit }, id) {
		await TaskService.__deleteFromServer(id);
		TaskService.__fetchFromServer().then(response => (commit('setTasks', response.data)))
	},
	async editTask({ commit }, id, data) {
		await TaskService.__editOnServer(id, data);
		TaskService.__fetchFromServer().then(response => (commit('setTasks', response.data)))
	},
	async finishTask({ commit }, [id, data]) {
		console.log("id: ", id);
		console.log(data);
		let finishedTaskData = {
		  body: data.body,
		  created: data.created,
		  finishBy: data.finishBy,
		  finishedOn: new Date().toISOString().split("T")[0]
		};
		await FinishedTaskService.__submitToServer(id, finishedTaskData);
		TaskService.__fetchFromServer().then(response => (commit('setTasks', response.data)))
	}
}

// mutations
const mutations = {
	setTasks (state, tasks) {
		state.all = tasks;
	}
}
  
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}