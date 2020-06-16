import FinishedTaskService from "../../api/modules/FinishedTaskService";

// state
const state = () => ({});

// getters
const getters = {};

// actions
const actions = {
  async finishTask({ dispatch }, [id, data]) {
    let finishedTaskData = {
      body: data.body,
      created: data.created,
      finishBy: data.finishBy,
      finishedOn: new Date().toISOString().split("T")[0]
    };
    await FinishedTaskService.__submitToServer(id, finishedTaskData);
    dispatch("tasks/fetchFromServer", null, { root: true });
  }
};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
