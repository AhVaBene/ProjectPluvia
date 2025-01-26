<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { MDBNavbar, MDBNavbarItem, MDBNavbarNav, MDBIcon, MDBBadge } from 'mdb-vue-ui-kit';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { useReportsStore } from '@/stores/reports';
import router from '@/router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const userStore = useUserStore();
const reportStore = useReportsStore();
const route = useRoute();

const routeName = computed<string>(() => route.path)

const secondaryTopBarRoutes: [string, string] = ["/notifications", "/profile"]
const favoriteLocations: {latitude: Number, longitude: Number}[] = []

async function getFavoriteLocations(): Promise<void> {
  favoriteLocations.length = 0
  const res: [{ latitude: Number; longitude: Number }] = (await axios.get("http://localhost:3000/users/profile/" + userStore.user)).data.locations;
  res.forEach(e => {
      favoriteLocations.push({latitude: e.latitude, longitude: e.longitude})
  });
}

async function onSuccess(position: { coords: { latitude: number, longitude: number}; }): Promise<void> {
  const latitude: number = position.coords.latitude;
  const longitude: number = position.coords.longitude;
  favoriteLocations.push({ latitude: latitude, longitude:longitude })

  try {
    const data = (await axios.get("http://localhost:3000/reports/notifications", {
      params: {
        locations: favoriteLocations
    }})
  ).data
  if(userStore.notifications < data.length) {
    toast("Wow so easy !", {
        autoClose: 1000,
      });
  }
  userStore.setNotifications(data.length)
  reportStore.setReports(data)
  } catch (e) {
    console.error(e)
  }
};

function error(err: any): void {
    console.log(err)
};

async function getNotifications(): Promise<void> {
  await getFavoriteLocations()
  navigator.geolocation.getCurrentPosition(onSuccess, error)
  toast.warn("There are new dangerous reports in your notifications", {
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2500,
  });
}

setInterval(getNotifications, 90000);

onMounted(getNotifications)
</script>

<template>
<MDBNavbar expand="lg" light bg="light" container position="sticky-top" class="border-bottom pb-1">
  <MDBNavbarNav left class="mx-2">
    
    <MDBNavbarItem v-if="!secondaryTopBarRoutes.includes(routeName)" to="/notifications" active >
      <MDBIcon icon="bell" size="lg" />
      <MDBBadge pill notification badge="danger">{{ userStore.notifications }}</MDBBadge>
    </MDBNavbarItem>

    <MDBNavbarItem @click="router.go(-1)" active v-else>
      <MDBIcon class="fa fa-arrow-left" size="lg" />
    </MDBNavbarItem>

  </MDBNavbarNav>
  <MDBNavbarNav class="mx-auto">
    <MDBNavbarItem>
      <h1>Pluvia</h1>
    </MDBNavbarItem>
  </MDBNavbarNav>
  <MDBNavbarNav right class="mx-2"> 
    
    <MDBNavbarItem v-if="!secondaryTopBarRoutes.includes(routeName)" to="/profile" active >
      <MDBIcon icon="user" size="lg"/>
    </MDBNavbarItem>

    <MDBNavbarItem v-else :to="routeName" class="invisible">
      <MDBIcon class="fa fa-arrow-left" size="lg" />
    </MDBNavbarItem>

  </MDBNavbarNav>
</MDBNavbar>
</template>