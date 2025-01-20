<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ReportCard from '@/components/ReportCard.vue';

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
    console.log(data)
  } catch (e) {
    console.error(e)
  }
};

const error = (err: any) => {
    console.log(err)
};

const listReports = () => {
  navigator.geolocation.getCurrentPosition(onSuccess, error)
}

onMounted(listReports)
</script>

<template>
  <section>
    <div class="row">
      <div class="col">
        <ReportCard v-for="report in reports" :report="report" :key="report.id" />
      </div>
    </div>
  </section>
</template>
