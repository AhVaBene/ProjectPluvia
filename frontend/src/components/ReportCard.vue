<script setup lang="ts">
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImg, MDBAccordion, MDBAccordionItem, mdbRipple, MDBCardFooter } from 'mdb-vue-ui-kit';
import { computed, ref } from 'vue';
import ReportCardFooterButton from './ReportCardFooterButton.vue';
import axios from 'axios';
import { RouterLink, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

const vMdbRipple = mdbRipple
const dangerIcon: string = "fa fa-exclamation-circle fa-lg me-3 riskLevel"
const route = useRoute()
const userStore = useUserStore();

const props = defineProps<{
    report: {
        id: string,
        location: {
            city: string,
            address: string,
            latitude: number,
            longitude: number,
            },
        pic: string,
        riskLevel: number,
        date: Date,
        username: string
    },
    isUserAdmin: Boolean
}>()

const activeItem = ref<string>('');

const fullAddress = computed<string>(() => {
    const addr = props.report.location.address + ", " + props.report.location.city
    if(addr.length > 34) {
        return addr.substring(0, 32) + "..."
    } 
    return addr;
})
const reportDate = computed<Date>(() => new Date(props.report.date))
const iconClass = computed<string>(() => dangerIcon + props.report.riskLevel)
const isRouteMap = computed<boolean>(() => !route.path.toString().includes('map'))

const emits = defineEmits(["imgClicked"])

async function onVerificationClick(riskLevel: number):Promise<void> {
    const newReport = props.report
    newReport.riskLevel = riskLevel
    const res = (await axios.put("http://localhost:3000/reports/" + props.report.id, {
        data: {
            riskLevel
        }})
    ).data
    console.log(res)
}
</script>

<template>
<MDBAccordion v-model="activeItem">
    <MDBAccordionItem
      :icon="iconClass"
      :header-title="fullAddress"
      collapseId="card"
    >
        <MDBCard>
            <MDBCardBody>
                <div class="d-flex justify-content-between">
                    <MDBCardText><h4>{{ props.report.username }}</h4></MDBCardText>
                    <MDBCardText class="text-end">
                        <small class="text-muted">
                            {{ ("0" + reportDate.getUTCHours()).slice(-2) + ":" + ("0" + reportDate.getUTCMinutes()).slice(-2) }} - 
                            {{ reportDate.getDate() + "/" + (reportDate.getMonth()+1) + "/" + reportDate.getFullYear() }}
                        </small>
                    </MDBCardText>
                </div>
                <MDBCardText>
                    <RouterLink v-if="isRouteMap" :to="{ name:'Map', params:{latlngzoom:report.location.latitude+','+report.location.longitude+',10'}}">{{ props.report.location.address + ", " + props.report.location.city }}</RouterLink>
                </MDBCardText>
            </MDBCardBody>
            <a v-mdb-ripple="{ color: 'light' }" v-on:click="$emit('imgClicked', props.report.pic)">
                <MDBCardImg style="height:auto;width:auto;max-height: 20rem;margin:auto" class="max-w-50 text-center" bottom v-bind:src="props.report.pic.toString()" :alt="`Report image at ${ fullAddress } of risk level ${props.report.riskLevel }`"/>
            </a>
            <MDBCardFooter v-if="props.isUserAdmin && props.report.riskLevel==0 && props.report.username != userStore.user">
                <div class="d-flex flex-column mb-3">
                    Assign a risk level
                    <div class="d-flex justify-content-between flex-row pt-2">
                        <div class="item"><ReportCardFooterButton :riskLevel="1" @verificationClick="onVerificationClick"/></div>
                        <div class="item"><ReportCardFooterButton :riskLevel="2" @verificationClick="onVerificationClick"/></div>
                        <div class="item"><ReportCardFooterButton :riskLevel="3" @verificationClick="onVerificationClick"/></div>
                        <div class="item"><ReportCardFooterButton :riskLevel="4" @verificationClick="onVerificationClick"/></div>
                    </div>
                </div>
            </MDBCardFooter>
        </MDBCard>
    </MDBAccordionItem>
</MDBAccordion>
</template>

<style>
#MDBAccordion {
    width: 50%;
}
.accordion-body {
    padding: 1%;
}
.card-body {
    padding: 1rem;
}
.card-footer {
    padding: 0.5rem;
}
.accordion-button {
    padding: 1rem;
}
.ripple-surface {
    cursor: pointer;
}
.riskLevel0 {
    color: gray;
}
.riskLevel1 {
    color: rgb(238, 238, 0);
}
.riskLevel2 {
    color: orange;
}
.riskLevel3 {
    color: red;
}
.item{
    flex: 1;
}
</style>