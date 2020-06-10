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
import { serverIO } from "../utils/serverio";

export default {
  mixins: [
    serverIO,
  ],
  computed: {
    filteredTasks: function() {
      return this.tasks.filter(i => i.done === false);
    },
  },
  created: async function() {
    await this.fetchTasks();
    console.log(this.tasks);
  }
};


</script>

<style lang="sass">
@import "@/stylesheets/main.scss"

</style>