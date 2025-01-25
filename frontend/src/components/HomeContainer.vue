<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ReportCard from '@/components/ReportCard.vue';
import { useUserStore } from '@/stores/user';
import { MDBModal, MDBModalHeader, MDBModalBody } from 'mdb-vue-ui-kit'

const userStore = useUserStore();

const reports = ref();
const avatarModal = ref<boolean>(false)
const isUserAdmin = ref<Boolean>(false);
const imgPath = ref<String>("")

function imgClickedCallback(srcImg: string): void {
  imgPath.value = srcImg
  avatarModal.value = !avatarModal.value
}

async function onSuccess(position: { coords: { latitude: number, longitude: number}; }): Promise<void> {
  const latitude: number = position.coords.latitude;
  const longitude: number = position.coords.longitude;
  console.log("lat: " + latitude + ", long: " + longitude)
  try {
  const data = (await axios.get("http://localhost:3000/reports/home", {
    params: {
        location: { latitude: latitude, longitude: longitude },
        isAdmin: isUserAdmin
    }})
  ).data
  reports.value = data

} catch (e) {
  console.error(e)
}
};

function error(err: any): void {
    console.log(err)
};

async function getUserAdmin(): Promise<Boolean> {
  return (await axios.get("http://localhost:3000/users/profile/" + userStore.user)).data.admin;
}

async function listReports(): Promise<void> {
  isUserAdmin.value = await getUserAdmin(); 
  navigator.geolocation.getCurrentPosition(onSuccess, error)
}

onMounted(listReports)
</script>

<template>
<div class="row pb-5">
  <div class="col">
    <ReportCard v-for="report in reports" :report="report" :isUserAdmin="isUserAdmin" @imgClicked="imgClickedCallback" class="w-100"/>
  </div>
</div>
<MDBModal
    id="imgModal"
    labelledby="imgModalLabel"
    v-model="avatarModal"
    centered size="xl"
  >
    <MDBModalHeader>
    </MDBModalHeader>
    <MDBModalBody>
      <img :src="imgPath.toString()" alt="Report image at fullscreen" />
    </MDBModalBody>
</MDBModal>
</template>
