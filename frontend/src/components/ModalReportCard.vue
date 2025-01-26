<script setup lang="ts">
import ReportCard from './ReportCard.vue';
import { MDBModal, MDBModalBody } from 'mdb-vue-ui-kit';
import { defineProps } from 'vue';

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
    },
    isUserAdmin: Boolean,
    open: boolean
}>()

</script>
<template>
    <MDBModal     
    labelledby="imgModalLabel"
    v-model="open"
    centered size="xl">
        <MDBModalBody>
            <ReportCard :report="report" :isUserAdmin="isUserAdmin"/>
        </MDBModalBody>
    </MDBModal>
</template>