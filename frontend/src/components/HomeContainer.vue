<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ReportCard from '@/components/ReportCard.vue';
import { useUserStore } from '@/stores/user';
import { MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody } from 'mdb-vue-ui-kit'

const userStore = useUserStore();

const reports = ref();
const avatarModal = ref<boolean>(false)
const isUserAdmin = ref<Boolean>(false);
const imgPath = ref<String>("")

const imgClickedCallback = (srcImg: string) => {
  imgPath.value = srcImg
  avatarModal.value = !avatarModal.value
}

const onSuccess = async (position: { coords: any; }) => {
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

const error = (err: any) => {
    console.log(err)
};

async function getUserAdmin(): Promise<Boolean> {
  return (await axios.get("http://localhost:3000/users/profile/" + userStore.user)).data.admin;
}

const listReports = async () => {
  isUserAdmin.value = await getUserAdmin(); 
  navigator.geolocation.getCurrentPosition(onSuccess, error)
}

onMounted(listReports)
</script>

<template>
<div class="row">
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
