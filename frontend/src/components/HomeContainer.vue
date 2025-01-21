<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ReportCard from '@/components/ReportCard.vue';
import ImageHighlightCard from '@/components/ImageHighlightCard.vue'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const reports = ref();
const isImageClicked = ref<Boolean>(false);
const isUserAdmin = ref<Boolean>(false);
const imgPath = ref<String>("")

const imgClickedCallback = (srcImg: string) => {
  imgPath.value = srcImg
  isImageClicked.value = !isImageClicked.value
}

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
  isUserAdmin.value = await getUserAdmin(); 
  navigator.geolocation.getCurrentPosition(onSuccess, error)
}

onMounted(listReports)
</script>

<template>
<section>
    <div class="bg-image">
        <div class="row">
            <div class="col">
                <ReportCard v-for="report in reports" :report="report" :isUserAdmin="isUserAdmin" @imgClicked="imgClickedCallback"/>
            </div>
        </div>
    </div>
    <div class="mask" v-if="isImageClicked"  style="background-color: rgba(0, 0, 0, 0.6)">
      <div class="d-flex justify-content-center align-items-center h-100">
        <ImageHighlightCard :imgPath="imgPath" @imgClicked="imgClickedCallback"/>
      </div>
    </div>
</section>
</template>
