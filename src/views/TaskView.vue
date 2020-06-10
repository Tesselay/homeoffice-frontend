<template>
    <div id="TaskView">
        <div class="container container__taskView">
            <div class="container__element container__element--task">
                    <input type="text" class="input input__text" form="task-form" v-model="body">
                    <input type="date" class="input input__date" form="task-form" v-model="finishBy">
                    <input type="submit" class="input input__submit" form="task-form" value="+" v-on:click="createTask">
            </div>
            <div class="container__element container__element--task" v-for="item in tasks" :key="item">
              <template v-if="!item.done">  
                <button class="input input__submit input__submit--finish"></button>
                <span class="container__text text__task text__task--body">{{ item.body }}</span>
                <div class="divider divider__vertical"></div>
                <label for="due-date" class="container__text text__task">Due:</label>
                <input type="date" id="due-date" class="input input__date" v-model="item.finishBy" disabled>
                <button class="input input__submit input__submit--delete">☓</button>
              </template>
            </div>
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
  created: async function() {
    await this.fetchTasks();
    console.log(this.tasks);
  },
  // updated: async function() {
  //   await this.fetchTasks();
  //   console.log(this.tasks);
  // },
  methods: {
    createTask() {
        let taskData = {
            body: this.body,
            created: new Date().toISOString().split('T')[0], 
            finishBy: this.finishBy,
            done: this.done,
            finishedOn: this.finishedOn,
        };
        this.__submitToServer(taskData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/tasks/post`, data);
    },
    async fetchTasks() {
      await axios.get(`${server.baseURL}/tasks`)
           .then(response => (this.tasks = response.data));
    }
  }
};


</script>

<style lang="sass">
@import "@/stylesheets/main.scss"

</style>