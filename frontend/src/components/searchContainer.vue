<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MDBInput, MDBBtn, MDBCollapse, MDBCheckbox, MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from 'mdb-vue-ui-kit';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import ReportCard from './ReportCard.vue';

const city= ref<string>('')
const address = ref<string>('')
const admin = ref<boolean>(false)
const collapse = ref<boolean>(false)
const riskLevel0 = ref<boolean>(false)
const riskLevel1 = ref<boolean>(false)
const riskLevel2 = ref<boolean>(false)
const riskLevel3 = ref<boolean>(false)
const date = ref<string>('')
const reports = ref()
const avatarModal = ref<boolean>(false)
const imgPath = ref<String>("")

interface Filters {
  address?: string;
  city?: string;
  riskLevel0?: boolean;
  riskLevel1?: boolean;
  riskLevel2?: boolean;
  riskLevel3?: boolean;
  date?: string;
}

const userStore = useUserStore()

async function getUserAdmin() {
  admin.value = (await axios.get("http://localhost:3000/users/profile/" + userStore.user)).data.admin;
}

function imgClickedCallback(srcImg: string): void {
  imgPath.value = srcImg
  avatarModal.value = !avatarModal.value
}

const searchReports = async () => {
  try {
    // Build query parameters dynamically
    const params= <Filters> {}

    if (address.value != '') {
      params.address = address.value;
    }
    if (city.value != '') {
      params.city = city.value;
    }
    if (riskLevel0.value) {
      params.riskLevel0 = riskLevel0.value;
    }
    if (riskLevel1.value) {
      params.riskLevel1 = riskLevel1.value;
    }
    if (riskLevel2.value) {
      params.riskLevel2 = riskLevel2.value;
    }
    if (riskLevel3.value) {
      params.riskLevel3 = riskLevel3.value;
    }
    if (date.value != '') {
      params.date = date.value;
    }

    // Make the GET request with the query parameters
    const response = await axios.get('http://localhost:3000/reports/search', { params });
    console.log(response.data)
    reports.value = response.data; // Return the reports array
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error; // Rethrow to handle in the calling function
  }
};


onMounted(()=>{getUserAdmin()})

</script>

<template>
  
    <div class="d-flex justify-content-center align-items-center">
    <MDBBtn color="primary"
    @click="collapse = !collapse"
    aria-controls="collapsibleContent"
    :aria-expanded="collapse"
    >
      <MDBIcon class="bi bi-list" size="lg"></MDBIcon>
    </MDBBtn>
  <MDBInput
    v-model="city"
    inputGroup
    :formOutline="false"
    wrapperClass="mb-3"
    placeholder="City"
    aria-label="Search"
    aria-describedby="button-addon2"
    class="w-50 mt-3"
  >
  </MDBInput>
    <MDBInput
    v-model="address"
    inputGroup
    :formOutline="false"
    wrapperClass="mb-3"
    placeholder="Address"
    aria-label="Search"
    aria-describedby="button-addon2"
    class="w-50 mt-3"
  >
    </MDBInput>
  <MDBBtn color="primary" @click="searchReports">
    <MDBIcon class="bi bi-search" size="lg"></MDBIcon>
  </MDBBtn>
</div>
  <MDBCollapse
    id="collapsibleContent1"
    v-model="collapse"
  >
  <div class="d-flex align-items-center gap-2">
  <MDBCheckbox label="RiskLevel 1" v-model="riskLevel1" />
  <i class="fa fa-exclamation-circle fa-lg riskLevel1"></i>
  </div>
  <div class="d-flex align-items-center gap-2">
  <MDBCheckbox label="RiskLevel 2" v-model="riskLevel2" />
  <i class="fa fa-exclamation-circle fa-lg riskLevel2"></i>
</div>
  <div class="d-flex align-items-center gap-2">
  <MDBCheckbox label="RiskLevel 3" v-model="riskLevel3" />
  <i class="fa fa-exclamation-circle fa-lg riskLevel3"></i>
</div>
<div v-if="admin" class="d-flex align-items-center gap-2">
  <MDBCheckbox label="RiskLevel 0" v-model="riskLevel0" />
  <i class="fa fa-exclamation-circle fa-lg riskLevel4"></i>
</div>
  <label for="startDate">Report Date</label>
  <input id="startDate" class="form-control" type="date" />
  </MDBCollapse>
  <div class="row pb-5">
  <div class="col">
    <ReportCard v-for="report in reports" :report="report" :isUserAdmin="admin" @imgClicked="imgClickedCallback" class="w-100"/>
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