<template>
  <fragment>
    <button
      class="btn btn--white"
      v-on:click="finishTask([all[index]._id, all[index]])"
    ></button>
    <span class="txt__task txt--default txt--large grow">{{
      all[index].body
    }}</span>
    <div class="divider__vertical"></div>
    <span
      style="min-width: 264px"
      class="txt__task txt--default"
      v-if="daysLeft >= 0 && all[index].finishBy != ''"
      >{{ daysLeft }} Days left</span
    >
    <button class="btn btn--red" v-on:click="deleteTask(all[index]._id)">
      <span class="txt__btn txt--large">x</span>
    </button>
  </fragment>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "DisplayTask",
  props: {
    index: Number
  },
  computed: {
    ...mapState("tasks", ["all"])
  },
  created: function() {
    let finishBySeparated = this.all[this.index].finishBy.split("-");
    let createdSeparated = this.all[this.index].created.split("-");

    let diffYear = finishBySeparated[0] - createdSeparated[0];
    let diffMonth = finishBySeparated[1] - createdSeparated[1];
    let diffDay = finishBySeparated[2] - createdSeparated[2];

    if (diffYear > 0) {
      this.daysLeft += diffYear * 365;
    }
    if (diffMonth > 0) {
      this.daysLeft += diffMonth * 30.42;
    }
    if (diffDay > 0) {
      this.daysLeft += diffDay;
    }
  },
  data() {
    return {
      daysLeft: 0
    };
  },
  methods: {
    ...mapActions("tasks", ["deleteTask"]),
    ...mapActions("finishedTasks", ["finishTask"])
  }
};
</script>
