<template>
<div class="col">
    <div class="text-center pt-4 mb-2">
        <img src="../assets/img/water.png" class="img-fluid"
        style="width: 185px;display: inline;" alt="Pluvia logo">
        <h1 class="mt-1">Pluvia</h1>
    </div>
    <LoginContainer v-if="isLogin"/>
    <RegisterComponent v-if="!isLogin"/>

    <!-- Switch to register button -->
    <div v-if="isLogin" class="text-center pt-2">
        <p>Not a member? <a class="text-primary" @click="onClicked">Register</a></p>
    </div>
    <!-- Switch to login button -->
    <div v-if="!isLogin" class="text-center pt-2">
        <p>Already have an account? <a class="text-primary" @click="onClicked">Login</a></p>
    </div>
</div>
</template>

<script setup lang="ts">
import LoginContainer from '@/components/LoginContainer.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
import { ref } from 'vue';

const isLogin = ref<boolean>(true);

function onClicked() {
    isLogin.value = !isLogin.value;
}
</script>