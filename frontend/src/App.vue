<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import BottomBar from './components/BottomBar.vue';
import TopBar from './components/TopBar.vue';
import { computed } from 'vue';

const route = useRoute();
const routeName = computed(() => route.path)

const bottomBarRoutes = ["/login", "/notifications", "/profile"]
const topBarRoutes = ["/login"]
</script>

<template>
<TopBar v-if="!topBarRoutes.includes(routeName)"></TopBar>

<main class="col-md-12">
  <RouterView />
</main>

<BottomBar v-if="!bottomBarRoutes.includes(routeName)"></BottomBar>
</template>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  padding: 0rem 0.8rem;
}
</style>