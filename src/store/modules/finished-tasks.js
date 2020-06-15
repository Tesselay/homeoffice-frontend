import FinishedTaskService from "../../api/modules/FinishedTaskService";
import TaskService from "../../api/modules/TaskService";

// state
const state = () => ({
})

// getters
const getters = {
}

// actions
const actions = {
	async finishTask({ commit }, id, data) {
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