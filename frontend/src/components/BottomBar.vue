<script setup lang="ts">
import { computed, ref,onMounted } from 'vue';
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

const lat = ref<Number>()
const lng = ref<Number>()

async function getCurrentPosition(): Promise<void> {
  navigator.geolocation.getCurrentPosition(onSuccess, error)
}

async function onSuccess(position: { coords: { latitude: number, longitude: number}; }): Promise<void> {
  const latitude: number = position.coords.latitude;
  const longitude: number = position.coords.longitude;
  lat.value = latitude
  lng.value = longitude
};

function error(err: any): void {
    console.log(err)
};

const route = useRoute();
const routeName = computed<string>(() => route.path)
const getLatitude = computed<string>(()=> lat.value != undefined ? lat.value.toString() : "0.0")
const getLongitude = computed<string>(()=> lng.value != undefined ? lng.value.toString() : "0.0")

onMounted(getCurrentPosition)
</script>

<template>
<MDBNavbar expand="lg" light bg="light" container position="bottom" class="border-top pt-1">
  <MDBNavbarNav class="mx-auto">
    <MDBNavbarItem to="/">
      <MDBIcon :class="routeName=='/' ? iconFillMapping.houseIcon : icons.houseIcon" size="lg" />
    </MDBNavbarItem>
  </MDBNavbarNav>
  <MDBNavbarNav class="mx-auto">
    <MDBNavbarItem :to="`/map/${getLatitude},${getLongitude},4`">
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

<style>
.sticky-bottom {
  position: fixed;
  bottom:0;
  margin-top: 5em;
}
</style>