<template>
<div class="d-grid gap-2 col-9 mx-auto py-3">
    <img src="../assets/img/404.jpg" />
    <MDBBtn color="primary" rounded @click="router.push('/')">Go home</MDBBtn>
</div>
</template>

<script setup lang="ts">
import router from '@/router';
import { MDBBtn } from 'mdb-vue-ui-kit';

</script>