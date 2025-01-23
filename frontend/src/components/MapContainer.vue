<script setup lang="ts">
import { VMap, VMapOsmTileLayer, VMapZoomControl } from 'vue-map-ui';

</script>

<template>
<VMap style="height: 100em; width:150em; top:5em;left:0; position: fixed;">
  <VMapOsmTileLayer />
  <VMapZoomControl />
</VMap>
</template>