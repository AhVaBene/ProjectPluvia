<script setup lang="ts">
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImg, MDBAccordion, MDBAccordionItem } from 'mdb-vue-ui-kit';
import { computed, ref } from 'vue';

const activeItem = ref('');

const props = defineProps<{
    report: {
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
    }//any,
    isUserAdmin: Boolean
}>()

const fullAddress = computed(() => {
    const addr = props.report.location.address + ", " + props.report.location.city
    if(addr.length > 34) {
        return addr.substring(0, 32) + "..."
    } 
    return addr;
})
const reportDate = computed(() => new Date(props.report.date))
const iconClass = computed(() => "fa fa-exclamation-circle fa-lg me-2 riskLevel" + props.report.riskLevel)
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
                <MDBCardTitle>{{ props.report.username }}</MDBCardTitle>
                <div class="d-flex justify-content-between">
                    <MDBCardText>
                        <ins>Vai alla mappa</ins>
                    </MDBCardText>
                    <MDBCardText class="text-end">
                        <small class="text-muted">
                            {{ ("0" + reportDate.getUTCHours()).slice(-2) + ":" + ("0" + reportDate.getUTCMinutes()).slice(-2) }}
                            {{ reportDate.getDate() + "/" + (reportDate.getMonth()+1) + "/" + reportDate.getFullYear() }}
                        </small>
                    </MDBCardText>
                </div>
            </MDBCardBody>
            <MDBCardImg bottom src="https://mdbootstrap.com/img/new/slides/041.webp" alt="..."/>
        </MDBCard>
    </MDBAccordionItem>
</MDBAccordion>
</template>

<style>
.accordion-body {
    padding: 1%;
}
.riskLevel0 {
    color: gray;
}
.riskLevel1 {
    color: yellow;
}
.riskLevel2 {
    color: orange;
}
.riskLevel3 {
    color: red;
}
</style>