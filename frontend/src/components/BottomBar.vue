<script setup lang="ts">
import { onMounted, ref } from 'vue';
// Icons array with default state (outlined version)
const icons = ref({
      houseIcon: "bi bi-house",
      geoIcon: "bi bi-map",
      searchIcon: "bi bi-search-heart",
      plusIcon: "bi bi-plus-circle",
    });

    const iconFillMapping = {
      houseIcon: "bi bi-house-door-fill",
      geoIcon: "bi bi-map-fill",
      searchIcon: "bi bi-search-heart-fill",
      plusIcon: "bi bi-plus-circle-fill",
    };

    const toggleIcon = (iconKey:keyof typeof icons.value) => {
      icons.value[iconKey] = icons.value[iconKey] === iconFillMapping[iconKey]? icons.value[iconKey].replace("-fill", ""): iconFillMapping[iconKey];
      for (const [name, iconClass] of Object.entries(icons.value)) {
        if (name !== iconKey) {
          icons.value[name as keyof typeof icons.value] = iconClass.replace("-fill", "");
        }
    }
  }


</script>
<template>
    <nav class="navbar bottom-bar navbar-dark">
    <div class="container d-flex justify-content-between">
      <button class="my-btn-icon"><RouterLink @click="toggleIcon('houseIcon')" to="/" class="nav-link"><i :class="icons.houseIcon"></i></RouterLink></button>
      <button class="my-btn-icon"><RouterLink @click="toggleIcon('geoIcon')" to="/map" class="nav-link"><i :class="icons.geoIcon"></i></RouterLink></button>
      <button class="my-btn-icon"><RouterLink @click="toggleIcon('searchIcon')" to="/search" class="nav-link"><i :class="icons.searchIcon"></i></RouterLink></button>
      <button class="my-btn-icon-last"><RouterLink @click="toggleIcon('plusIcon')" to="/report" class="nav-link"><i :class="icons.plusIcon"></i></RouterLink></button>
    </div>
  </nav>
</template>
<style>
    .bottom-bar {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #242424;
        border-top: 2px solid black;;
    }
    .bottom-bar .nav-item {
        flex-grow: 1;
        text-align: center;
    }
    .my-btn-icon {
        background-color: #242424;
        border: none;
        border-right: 2px solid black;
        flex: 1;
        cursor: pointer;
        color:white
    }
    .my-btn-icon-last {
        background-color: #242424;
        border: none;
        flex: 1;
        cursor: pointer;
        color:white
    }
</style>