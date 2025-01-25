<script setup lang="ts">
import { VMap, VMapOsmTileLayer, VMapZoomControl } from 'vue-map-ui';

</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex-grow basis-full">
<VMap style="width: 100%;height:43em;">
  <VMapOsmTileLayer />
  <VMapZoomControl />
</VMap>
  </div>
</div>
</template>