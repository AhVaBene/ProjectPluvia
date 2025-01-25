<script setup lang="ts">
import { ref } from 'vue'
import { VMap, VMapOsmTileLayer, VMapZoomControl, VMapMarker } from 'vue-map-ui';
import axios from 'axios';
import type { LatLng, LatLngBounds, LatLngTuple } from 'leaflet';
import type { ViewChangedEvent } from 'vue-use-leaflet';
import { MDBFile, MDBBtn } from 'mdb-vue-ui-kit';
import { useUserStore } from '@/stores/user';

const address = ref("via antonio samorì 10")
const coordinates  = ref({lat:0,lng:0})
const user = useUserStore()

const fetchGeocode = async () => {
      //reverse geocoding even is usegul 
      const apiKey = "AIzaSyBp0zuqne1wsZMqJzo8cxpG8GLvGpg7_W8";
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address.value
      )}&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
          coordinates.value = response.data.results[0].geometry.location;
          console.log(coordinates.value)
        } else {
          alert(`Error: ${response.data.status}`);
        }
      } catch (error) {
        console.error("Error fetching geocode:", error);
        alert("Failed to fetch geocode. Check the console for details.");
      }

    }

const setAddress = (e)=>{
    console.log(e)
    address.value = e.name
}

const uploadedImage = ref<string | null>(null);
const image = ref<Blob>()
// Function to handle file selection
function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    image.value = file 
    uploadedImage.value = URL.createObjectURL(file); // Create a URL for the uploaded file
  }
}

const center = ref<LatLngTuple | LatLng>([0, 0]);
const zoom = ref(0);
const bounds = ref<LatLngBounds | null>(null);

function onViewChanged(e: ViewChangedEvent) {
  center.value = e.center;
  zoom.value = e.zoom;
  bounds.value = e.bounds;
}


const onSuccess = async (position: { coords: any; }) => {
  const latitude: number = position.coords.latitude;
  const longitude: number = position.coords.longitude;
  coordinates.value.lat = latitude
  coordinates.value.lng = longitude
}

const error = (err: any) => {
    console.log(err)
};

const geolocateme = async () => {
  navigator.geolocation.getCurrentPosition(onSuccess, error)
}

const movedMarker = (e)=>{
  console.log(e.target._latlng)
  coordinates.value = e.target._latlng
  console.log(coordinates.value)
}

const locality = ref<String>('None')
const city = ref<String>('')

const reverseGeocoding = async ()=>{
  const apiKey = "AIzaSyBp0zuqne1wsZMqJzo8cxpG8GLvGpg7_W8";
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodeURIComponent(
        coordinates.value.lat.toString()+","+coordinates.value.lng.toString()
      )}&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
          response.data.results.forEach(d=>{
            if(d.types.includes('street_address') || d.types.includes('route')){
              d.address_components.forEach(e=>{
                if(e.types.includes('locality') || e.types.includes("administrative_area_level_3")){
                  city.value = e.long_name  
                }
                if(e.types.includes('route')){
                  locality.value = e.long_name  
                }
              }) 
            }
            console.log(d)
            console.log(d.types)
          })
          console.log(response.data)
        } else {
          alert(`Error: ${response.data.status}`);
        }
      } catch (error) {
        console.error("Error fetching geocode:", error);
        alert("Failed to fetch geocode. Check the console for details.");
      }
}

const sendReport = async()=>{
  if(image.value !== undefined && coordinates.value.lat !== 0 && coordinates.value.lng !== 0){
    const formData = new FormData();
    await reverseGeocoding()
    const location = {
      city: city.value,
      address: locality.value,
      latitude: coordinates.value.lat,
      longitude: coordinates.value.lng,
    }
    formData.append('file',image.value)
    formData.append('username',user.user)
    formData.append('riskLevel','0')
    formData.append('date', new Date().toJSON())
    formData.append('location',JSON.stringify(location))
    console.log(formData)
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    const res = (await axios.post("http://localhost:3000/reports/report", formData, {headers: {
        'Content-Type': 'multipart/form-data',
      },}))

      console.log('File uploaded successfully:', res.data);
  }else{
    console.log("You can't send ")
  }
}
</script>

<template>
<div class="content">
<MDBFile label="Image" class="custom-file-upload" @change="handleFileUpload" />
<div v-if="uploadedImage" class="d-flex justify-content-center align-items-center mt-5 mb-2">
      <img :src="uploadedImage" alt="Uploaded Image" />
    </div>
    <div class="d-flex justify-content-center align-items-center mt-2 mb-1">
      <GMapAutocomplete
        @place_changed="setAddress"
        class="form-control"
        placeholder="Address or  Pincode">
      </GMapAutocomplete>
      <MDBBtn color="primary" rounded  @click="fetchGeocode">Locate</MDBBtn>
      <MDBBtn color="primary" rounded @click="geolocateme">geolocate me</MDBBtn>
  </div>
</div>
<div class="flex flex-col w-full h-full">
    <div class="flex-grow basis-full">
      <VMap :center="center" :zoom="zoom" @view-changed="onViewChanged" style="width: 100%;height:20em;">
        <VMapOsmTileLayer />
        <VMapZoomControl />
        <VMapAttributionControl />
        <VMapMarker :latlng="[coordinates.lat, coordinates.lng]" :draggable="true" @moveend="movedMarker"/>
      </VMap>
    </div>
  </div>
  <div class="d-flex justify-content-center align-items-center mt-2 mb-7">
    <MDBBtn color="primary" rounded @click="sendReport">send</MDBBtn>
  </div>
</template>

<style>

.content{
    margin-top: 4.8em;
    margin-right: 0;
    margin-left: 0;
}

.custom-file-upload {
  border-bottom: 2px solid #242424;
  /* display: inline-block; Ensures it behaves as a block element */
  width: 100%; /* Takes the full width */
  padding: 10px 12px;
  cursor: pointer;
  text-align: center;
  margin:0;
}
</style>