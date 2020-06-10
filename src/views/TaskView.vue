<template>
    <div id="TaskView" class="taskview">
        <div class="taskview__element taskview__input">
            <input type="text" class="ipt ipt__text txt__ipt txt--default grow" v-model="body" v-on:keyup.enter="createTask">
            <input type="date" class="ipt ipt__date txt__ipt txt--default" v-model="finishBy" v-on:keyup.enter="createTask">
            <button class="btn btn--blue" v-on:click="createTask">
                <span class="txt__btn txt--large">+</span>
            </button>
        </div>
        <div class="taskview__element taskview__task" v-for="item in filteredTasks" :key="item">
            <button class="btn btn--white" v-on:click="item.done = true; editTask(item._id, item)">
            </button>
            <span class="txt__task txt--default txt--large grow">{{ item.body }}</span>
            <div class="divider__vertical"></div>
            
            <label class="txt__label txt--default">Due:</label>
            <input type="date" class="ipt ipt__date txt__ipt txt--default" v-model="item.finishBy" disabled>
            
            <button class="btn btn--red" v-on:click="deleteTask(item._id)">
                <span class="txt__btn txt--large">x</span>
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { server } from "../utils/helper";

export default {
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
  computed: {
    filteredTasks: function() {
      return this.tasks.filter(i => i.done === false);
    },
  },
  created: async function() {
    await this.fetchTasks();
    console.log(this.tasks);
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
};


</script>

<style lang="sass">
@import "@/stylesheets/main.scss"

</style>