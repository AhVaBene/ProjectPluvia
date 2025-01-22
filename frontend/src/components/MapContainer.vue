<script setup lang="ts">
import { VMap, VMapOsmTileLayer, VMapZoomControl } from 'vue-map-ui';
import BottomBar from './BottomBar.vue';
import TopBar from './TopBar.vue';
</script>

<template>
  <TopBar/>
  <VMap style="height: 100em; width:150em; top:5em;left:0; position: fixed;">
    <VMapOsmTileLayer />
    <VMapZoomControl />
  </VMap>
  <BottomBar/>
</template>