<template>
    <div id="TaskView">
        <div class="container container__taskView">
            <div class="container__element container__element--task">
                    <input type="text" class="input input__text" form="task-form">
                    <input type="date" class="input input__date" form="task-form">
                    <input type="submit" class="input input__submit" form="task-form" value="+">
            </div>
            <div class="container__element container__element--task">
                <input type="submit" class="input input__submit" value="✓">
                <span class="container__text input__text text__task">{{ body }}</span>
                <div class="divider divider__vertical"></div>
                <label for="due-date" class="container__text text__task">Due:</label>
                <input type="date" id="due-date" class="input input__date" value="2020-01-07" disabled>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function()
    {
        return {
            body: "This is a test taskkkkkkkkk kkkkkkkkkkkkkkkkkkkk kkkkkkkkkk kkkkkkkkkk kkkkkkkkkkkkk",
            created: "", 
            finished: "",
            done: false
        }
    }
    
}
</script>

<style lang="sass">
@import "@/stylesheets/main.scss"

</style>