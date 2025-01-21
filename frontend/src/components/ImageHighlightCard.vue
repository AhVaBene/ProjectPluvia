<script setup lang="ts">
import { MDBCard, MDBCardTitle, MDBCardImg, MDBCardBody } from 'mdb-vue-ui-kit';

const props = defineProps(["imgPath"])
const emits = defineEmits(["imgClicked"])
</script>

<template>
<MDBCard bg="white" text="end">
    <MDBCardBody>
        <MDBCardTitle><i class="fa fa-times-circle fa-lg" v-on:click="$emit('imgClicked', '')"></i></MDBCardTitle>
    </MDBCardBody>
    <MDBCardImg v-bind:src="props['imgPath']" alt="Report image at fullscreen" />
</MDBCard>
</template>

<style>
.card-body {
    padding: 0.5rem 1rem;
}
.fa {
    cursor: pointer;
}
</style>