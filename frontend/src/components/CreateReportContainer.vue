<script setup lang="ts">
import { ref } from 'vue'
import BottomBar from './BottomBar.vue';
import TopBar from './TopBar.vue';
import { VMap, VMapOsmTileLayer, VMapZoomControl, VMapMarker } from 'vue-map-ui';
import axios from 'axios';


const address = ref("via antonio samorì 10")
const coordinates  = ref({lat:0,lng:0})

const fetchGeocode = async () => {
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
// Function to handle file selection
function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    uploadedImage.value = URL.createObjectURL(file); // Create a URL for the uploaded file
  }
}

import type { LatLng, LatLngBounds, LatLngTuple } from 'leaflet';
import type { ViewChangedEvent } from 'vue-use-leaflet';

const center = ref<LatLngTuple | LatLng>([0, 0]);
const zoom = ref(0);
const bounds = ref<LatLngBounds | null>(null);

function onViewChanged(e: ViewChangedEvent) {
  center.value = e.center;
  zoom.value = e.zoom;
  bounds.value = e.bounds;
}

</script>

<template>
<TopBar/>
<div class="content">
    <label class="custom-file-upload ">
    <input type="file" @change="handleFileUpload" accept="image/*"/>
    Custom Upload
</label>
<div v-if="uploadedImage" class="image-preview">
      <img :src="uploadedImage" alt="Uploaded Image" />
    </div>
    <div class="custom-file-upload"  @click="fetchGeocode">Current position</div>
    <GMapAutocomplete
       @place_changed="setAddress"
       placeholder="Address or  Pincode">
    </GMapAutocomplete>
    <button @click="fetchGeocode">Locate</button>
    <button>Use my position</button>
</div>
  <p v-for="(m, index) in markers">{{m.position.lat}}</p>
<div class="flex flex-col w-full h-full">
    <div class="flex-grow basis-full">
      <VMap :center="center" :zoom="zoom" @view-changed="onViewChanged" style="width: 100%;height:20em;">
        <VMapOsmTileLayer />
        <VMapZoomControl />
        <VMapAttributionControl />
        <VMapMarker :latlng="[coordinates.lat, coordinates.lng]" :draggable="true"/>
      </VMap>
    </div>
    {{console.log(coordinates)}}
    {{console.log(coordinates.lat)}}
    <!-- <div class="px-1 pt-3 flex-shrink-0 text-sm overflow-hidden">
      center: {{ center }}, zoom: {{ zoom }}, bounds: {{ bounds }}
    </div> -->
  </div>
<button>Send</button>
<BottomBar/>
</template>

<style>
input[type="file"] {
  display: none;
}

body{
    padding:0;
    margin: 0;
    background-color: #242424;
}

.content{
    margin-top: 4.8em;
    margin-right: 0;
    margin-left: 0;
    background-color: #242424;
}

.custom-file-upload {
  border-bottom: 2px solid black;
  /* display: inline-block; Ensures it behaves as a block element */
  width: 100%; /* Takes the full width */
  padding: 10px 12px;
  cursor: pointer;
  text-align: center;
  background-color: #242424; /* Slightly lighter background for contrast */
  color: white;
  margin:0;
}
</style>