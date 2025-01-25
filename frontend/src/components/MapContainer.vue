<script setup lang="ts">
import { VMap, VMapOsmTileLayer, VMapZoomControl } from 'vue-map-ui';

</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex-grow basis-full">
<VMap class="chart">
  <VMapOsmTileLayer />
  <VMapZoomControl />
</VMap>
  </div>
</div>
</template>

<style>
@media (min-height: 600px) {
  /* Styles for viewports with a height of at least 600px */
  .chart {
    width:100%;
    height:39em !important;
  }
}
@media (min-height: 700px) {
  /* Styles for viewports with a height of at least 600px */
  .chart {
    width:100%;
    height:43em !important;
  }
}
@media (min-height: 800px) {
  /* Styles for viewports with a height of at least 600px */
  .chart {
    width:100%;
    height:53em !important;
  }
}
@media (min-height: 900px) {
  /* Styles for viewports with a height of at least 600px */
  .chart {
    width:100%;
    height:56em !important;
  }
}
@media (min-height: 1000px) {
  /* Styles for viewports with a height of at least 600px */
  .chart {
    width:100%;
    height:63em !important;
  }
}

</style>