<script setup lang="ts">
import { VMap, VMapOsmTileLayer, VMapZoomControl } from 'vue-map-ui';

</script>

<template>
<VMap style="width: 100%;height:50rem;">
  <VMapOsmTileLayer />
  <VMapZoomControl />
</VMap>
</template>