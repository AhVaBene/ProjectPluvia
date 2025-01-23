<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { MDBNavbar, MDBNavbarNav, MDBIcon, MDBNavbarItem } from 'mdb-vue-ui-kit';
import { useRoute } from 'vue-router';

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

const route = useRoute();
const routeName = computed(() => route.path)
</script>

<template>
<MDBNavbar expand="lg" light bg="light" container position="bottom" class="border-top pt-1">
  <MDBNavbarNav class="mx-auto">
    <MDBNavbarItem to="/">
      <MDBIcon :class="routeName=='/' ? iconFillMapping.houseIcon : icons.houseIcon" size="lg" />
    </MDBNavbarItem>
  </MDBNavbarNav>
  <MDBNavbarNav class="mx-auto">
    <MDBNavbarItem to="/map">
      <MDBIcon :class="routeName=='/map' ? iconFillMapping.geoIcon : icons.geoIcon" size="lg" />
    </MDBNavbarItem>
  </MDBNavbarNav>
  <MDBNavbarNav class="mx-auto">
    <MDBNavbarItem to="/search">
      <MDBIcon :class="routeName=='/search' ? iconFillMapping.searchIcon : icons.searchIcon" size="lg" />
    </MDBNavbarItem>
  </MDBNavbarNav>
  <MDBNavbarNav class="mx-auto">
    <MDBNavbarItem to="/createReport">
      <MDBIcon :class="routeName=='/createReport' ? iconFillMapping.plusIcon : icons.plusIcon" size="lg" />
    </MDBNavbarItem>
  </MDBNavbarNav>
</MDBNavbar>
</template>