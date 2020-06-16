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
	async createTask({ dispatch },  data) {
		let taskData = {
		  body: data.body,
		  created: new Date().toISOString().split("T")[0],
		  finishBy: data.finishBy
		};
		await TaskService.__submitToServer(taskData);
		dispatch("fetchFromServer");
	},
	async deleteTask({ dispatch }, id) {
		await TaskService.__deleteFromServer(id);
		dispatch("fetchFromServer");
	},
	async editTask({ dispatch }, [id, data]) {
		await TaskService.__editOnServer(id, data);
		dispatch("fetchFromServer");
	},
	async finishTask({ dispatch }, [id, data]) {
		console.log("id: ", id);
		console.log(data);
		let finishedTaskData = {
		  body: data.body,
		  created: data.created,
		  finishBy: data.finishBy,
		  finishedOn: new Date().toISOString().split("T")[0]
		};
		await FinishedTaskService.__submitToServer(id, finishedTaskData);
		dispatch("fetchFromServer");
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