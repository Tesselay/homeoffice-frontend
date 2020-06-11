<template>
    <div id="TaskView" class="taskview">
        <div class="taskview__element taskview__input">
            <input type="text" class="ipt ipt__text txt__ipt txt--default grow" v-model="body" v-on:keyup.enter="createTask">
            <input type="date" class="ipt ipt__date txt__ipt txt--default" v-model="finishBy" v-on:keyup.enter="createTask">
            <button class="btn btn--blue" v-on:click="createTask">
                <span class="txt__btn txt--large">+</span>
            </button>
        </div>
        <div class="taskview__element taskview__task" v-for="item in tasks" :key="item">
          <display-task :item=item @deleteTask="deleteTask(item._id)" @finishTask="finishTask(item._id, item)"></display-task>
        </div>
    </div>
</template>

<script>
import { serverIO } from "../utils/serverio";
import DisplayTask from "../components/DisplayTask";

export default {
  mixins: [
    serverIO,
  ],
  components: {
    DisplayTask
  },
  created: async function() {
    await this.fetchTasks();
  }
};


</script>

<style lang="sass">
@import "@/stylesheets/main.scss"

</style>