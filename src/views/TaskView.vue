<template>
  <div id="TaskView" class="taskview">
    <div class="taskview__element taskview__input">
      <input
        type="text"
        class="ipt ipt__text txt__ipt txt--default grow"
        v-model="task.body"
        v-on:keyup.enter="createTask(task)"
      />
      <input
        type="date"
        class="ipt ipt__date txt__ipt txt--default"
        v-model="task.finishBy"
        v-on:keyup.enter="createTask(task)"
      />
      <button class="btn btn--blue" v-on:click="createTask(task)">
        <span class="txt__btn txt--large">+</span>
      </button>
    </div>
    <div
      class="taskview__element taskview__task"
      v-for="item in tasks"
      :key="item"
    >
      <display-task
        :item="item"
        @deleteTask="deleteTask(item._id)"
        @finishTask="finishTask(item._id, item)"
      ></display-task>
    </div>
  </div>
</template>

<script>
import DisplayTask from "../components/DisplayTask";
import TaskService from "../api/modules/TaskService";
import FinishTaskService from "../api/modules/FinishedTaskService";

export default {
  data: function() {
    return {
      tasks: [],
      task: {
        body: "",
        created: "",
        finishBy: ""
      }
    };
  },
  components: {
    DisplayTask
  },
  created() {
    TaskService.__fetchFromServer().then(
      response => (this.tasks = response.data)
    );
  },
  methods: {
    async createTask(data) {
      let taskData = {
        body: data.body,
        created: new Date().toISOString().split("T")[0],
        finishBy: data.finishBy
      };
      await TaskService.__submitToServer(taskData);
      TaskService.__fetchFromServer().then(
        response => (this.tasks = response.data)
      );
    },
    async deleteTask(id) {
      await TaskService.__deleteFromServer(id);
      TaskService.__fetchFromServer().then(
        response => (this.tasks = response.data)
      );
    },
    async editTask(id, data) {
      await TaskService.__editOnServer(id, data);
      TaskService.__fetchFromServer().then(
        response => (this.tasks = response.data)
      );
    },
    async finishTask(id, data) {
      let finishedTaskData = {
        body: data.body,
        created: data.created,
        finishBy: data.finishBy,
        finishedOn: new Date().toISOString().split("T")[0]
      };
      await FinishTaskService.__submitToServer(id, finishedTaskData);
      TaskService.__fetchFromServer().then(
        response => (this.tasks = response.data)
      );
    }
  }
};
</script>
