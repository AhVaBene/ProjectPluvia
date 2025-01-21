<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ReportCard from '@/components/ReportCard.vue';
import { useUserStore } from '@/stores/user';

const reports = ref([{
  id: String,
  location: {
      city: String,
      address: String,
      latitude: Number,
      longitude: Number,
      },
  pic: String,
  riskLevel: Number,
  date: Date,
  username: String
}]);
let isUserAdmin: Boolean;
const userStore = useUserStore();

const onSuccess = async (position: { coords: any; }) => {
    const latitude: number = position.coords.latitude;
    const longitude: number = position.coords.longitude;
    try {
    const data = (await axios.get("http://localhost:3000/reports/home", {
      params: {
          location: { latitude: latitude, longitude: longitude }
      }})
    ).data
    reports.value = data
  } catch (e) {
    console.error(e)
  }
};

const error = (err: any) => {
    console.log(err)
};

async function getUserAdmin(): Promise<Boolean> {
  return (await axios.get("http://localhost:3000/users/profile/" + userStore.user)).data.admin;
}

const listReports = async () => {
  isUserAdmin = await getUserAdmin(); 
  navigator.geolocation.getCurrentPosition(onSuccess, error)
}

onMounted(listReports)
</script>

<template>
  <section>
    <div class="row">
      <div class="col">
        <ReportCard v-for="report in reports" :report="report" :isUserAdmin="isUserAdmin" />
      </div>
    </div>
  </section>
</template>
