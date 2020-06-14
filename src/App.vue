<template>
  <div id="app">
    <div id="nav">
      <router-link to="/tasks">Go to Tasks</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="sass">
@import "@/stylesheets/main.scss"
</style>