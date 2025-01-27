<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import BottomBar from './components/BottomBar.vue';
import TopBar from './components/TopBar.vue';
import { computed } from 'vue';
import { useUserStore } from './stores/user';

const route = useRoute();
const userStore = useUserStore();

const routeName = computed<string>(() => route.path.split('/')[1])

const bottomBarRoutes = ["", "map", "createReport", "search"]
const topBarRoutes = ["", "map", "createReport", "search", "notifications", "profile"]
</script>

<template>
<TopBar v-if="topBarRoutes.includes(routeName) && userStore.token"></TopBar>

<main class="col-md-12">
  <RouterView />
</main>

<BottomBar v-if="bottomBarRoutes.includes(routeName) && userStore.token"></BottomBar>
</template>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  padding: 0rem 0.8rem;
}
</style>