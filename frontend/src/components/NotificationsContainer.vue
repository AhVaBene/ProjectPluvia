<template>
<div class="row">
  <div class="col">
    <ReportCard v-for="report in reports" :report="report" :isUserAdmin="false" @imgClicked="imgClickedCallback" class="w-100"/>
  </div>
</div>
<MDBModal
    id="imgModal"
    labelledby="imgModalLabel"
    v-model="imgModal"
    centered size="xl"
  >
    <MDBModalHeader>
    </MDBModalHeader>
    <MDBModalBody>
      <img :src="imgPath.toString()" alt="Report image at fullscreen" />
    </MDBModalBody>
</MDBModal>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ReportCard from '@/components/ReportCard.vue';
import { MDBModal, MDBModalHeader, MDBModalBody } from 'mdb-vue-ui-kit'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const reports = ref<[{
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
}]>();
const imgModal = ref<boolean>(false)
const imgPath = ref<String>("")
const favoriteLocations: {latitude: Number, longitude: Number}[] = []

const imgClickedCallback = (srcImg: string) => {
  imgPath.value = srcImg
  imgModal.value = !imgModal.value
}

const getFavoriteLocations = async () => {
    const res: [{ latitude: Number; longitude: Number }] = (await axios.get("http://localhost:3000/users/profile/" + userStore.user)).data.locations;
    res.forEach(e => {
        favoriteLocations.push({latitude: e.latitude, longitude: e.longitude})
    });
}

const onSuccess = async (position: { coords: any; }) => {
    const latitude: number = position.coords.latitude;
    const longitude: number = position.coords.longitude;
    favoriteLocations.push({ latitude: latitude, longitude:longitude })

    try {
        const data = (await axios.get("http://localhost:3000/reports/notifications", {
            params: {
                locations: favoriteLocations
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

const listReports = async () => {
    await getFavoriteLocations()

    navigator.geolocation.getCurrentPosition(onSuccess, error)
}

onMounted(listReports)
</script>