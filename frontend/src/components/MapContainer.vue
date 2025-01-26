<script setup lang="ts">
import axios from 'axios';
import { VMap, VMapOsmTileLayer, VMapZoomControl, VMapMarker, VMapPinIcon, VMapLocateControl, VMapAttributionControl } from 'vue-map-ui';
import { ref, onMounted, computed } from "vue";
import { useUserStore } from '@/stores/user';
import ReportCard from './ReportCard.vue';
import { MDBModal, MDBModalBody } from 'mdb-vue-ui-kit';
import { useRoute } from 'vue-router';
import { type LatLng, type LatLngBounds, type LatLngTuple } from 'leaflet';
import '@leaflet-extensions/locatecontrol';
import '@leaflet-extensions/locatecontrol/dist/leaflet-locatecontrol.css';

const userStore = useUserStore();
const route = useRoute();
const markerColors = ['grey', 'yellow', 'orange', 'red']

interface Marker {
  id: string;
  location: {
    city: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  pic: string;
  riskLevel: number;
  date: Date;
  username: string;
}

const reports = ref<Marker[]>([])
const clicked = ref<number>(-1)
const admin = ref<Boolean>(false)
const showModal = ref()
const center = ref<LatLngTuple | LatLng>([0, 0]);
const zoom = ref(0)

const isLatAndLngSet = ()=>{
  console.log('thequery')
  console.log(route.params)
  if(route.params.latlngzoom != undefined){
    const [lat, lng, z] = route.params.latlngzoom.toString().split(",").slice(0,3)
    console.log(lat, lng, z)
    center.value = [parseFloat(lat as string), parseFloat(lng as string)]
    zoom.value=parseInt(z)
  }
}
const getAllReports = async ()=>{
 const data = (await axios.get("http://localhost:3000/reports/report")).data
 filterReports(data)
 console.log(reports.value)
}

const filterReports = (data:Marker[])=>{
  console.log("begin filtering")
  data.forEach((e:Marker)=>{
  if(admin.value && e.riskLevel > -1){
    reports.value.push(e)
  }
  if(!admin.value && e.riskLevel > 0 ){
    reports.value.push(e)
    console.log(e)
  }
 })
}

const clickedMarker = (index:number)=>{  
  clicked.value=index
  console.log(index)
  console.log(reports.value[0])
  if(clicked.value>=0 && reports.value.length > 0){
    showModal.value=true
  }
}

async function getUserAdmin() {
  admin.value = (await axios.get("http://localhost:3000/users/profile/" + userStore.user)).data.admin;
}

onMounted(async ()=>{
  await getUserAdmin();
  getAllReports();
  isLatAndLngSet()
})

const showModalComputed = computed(()=>{return clicked.value>=0 && reports.value.length > 0})
</script>

<template>
  <!-- <ModalReportCard v-if="clicked.valueOf()>=0 && reports.length > 0" :open="clicked.valueOf()>=0 && reports.length > 0"  :report="reports[0]" :is-user-admin="admin"/> -->
    <MDBModal     
    labelledby="reportCardModalLabel"
    v-model="showModal"
    centered size="xl">
        <MDBModalBody>
            <ReportCard :report="reports[clicked]" :isUserAdmin="admin"/>
        </MDBModalBody>
    </MDBModal>
    <div class="flex flex-col w-full h-full">
    <div class="flex-grow basis-full">
<VMap class="chart" :center="center" :zoom="zoom">
  <VMapOsmTileLayer />
  <VMapZoomControl />
  <VMapLocateControl />
  <VMapAttributionControl />
    <VMapMarker v-for="(marker, index) in reports"
      :key="index"
      :latlng="[marker.location.latitude, marker.location.longitude]"
      @click="clickedMarker(index)"
    ><VMapPinIcon :color="markerColors[marker.riskLevel]"></VMapPinIcon></VMapMarker>
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