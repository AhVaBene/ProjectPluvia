<template>
<div class="row">
  <div class="col">
    <ReportCard v-for="report in reportStore.reports" :report="report" :isUserAdmin="false" @imgClicked="imgClickedCallback" class="w-100"/>
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
import { ref } from 'vue';
import ReportCard from '@/components/ReportCard.vue';
import { MDBModal, MDBModalHeader, MDBModalBody } from 'mdb-vue-ui-kit'
import { useReportsStore } from '@/stores/reports';

const reportStore = useReportsStore();

const imgModal = ref<boolean>(false)
const imgPath = ref<String>("")

const imgClickedCallback = (srcImg: string) => {
  imgPath.value = srcImg
  imgModal.value = !imgModal.value
}
</script>