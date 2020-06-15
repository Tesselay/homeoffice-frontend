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
      v-for="(_, index) in all"
      :key="_"
    >
      <display-task
	  	:index="index"
      ></display-task>
    </div>
  </div>
</template>

<script>
import DisplayTask from "../components/DisplayTask";
import { mapState, mapActions } from "vuex";

export default {
  data: function() {
    return {
      task: {
        body: "",
        created: "",
        finishBy: ""
      }
    };
  },
  computed: {
	...mapState('tasks', ['all']),
},
  components: {
    DisplayTask
  },
  created() {
	  this.$store.dispatch('tasks/fetchFromServer');
	},
  methods: {
	  ...mapActions("tasks", ["createTask"])
  }
};
</script>
