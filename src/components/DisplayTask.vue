<template>
	<fragment>
		<button class="btn btn--white" v-on:click="item.done = true; editTask()">
		</button>
		<span class="txt__task txt--default txt--large grow">{{ item.body }}</span>
		<div class="divider__vertical"></div>
		
		<label class="txt__label txt--default">Due:</label>
		<input type="date" class="ipt ipt__date txt__ipt txt--default" v-model="item.finishBy" disabled>
		
		<button class="btn btn--red" v-on:click="deleteTask()">
			<span class="txt__btn txt--large">x</span>
		</button>
	</fragment>
</template>

<script>
export default {
	name: "DisplayTask",
	props: {
		item: Object
	},
	methods: {
		editTask() {
			this.$emit("editTask");
		},
		deleteTask() {
			this.$emit("deleteTask");
		}
	}
}
</script>