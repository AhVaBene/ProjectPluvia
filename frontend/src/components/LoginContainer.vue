<template>
    <form @submit.prevent="login" class="px-4">
    <p class="text-center">Please login to your account</p>
    <!-- Username input -->
    <MDBInput required v-model="data.username" label="Username" id="username" wrapperClass="mb-3" />

    <!-- Password input -->
    <MDBInput required v-model="data.password" label="Password" type="password" id="password" wrapperClass="mb-3" />

    <p v-if="loginError" class="text-danger">Login failed: try again</p>
    <!-- Submit button -->
    <MDBBtn color="primary" block type="submit">Sign in</MDBBtn>
</form>
</template>

<script setup lang="ts">
import { MDBInput, MDBBtn } from 'mdb-vue-ui-kit';
import { useUserStore } from '@/stores/user';
import  router  from '@/router/'
import axios from 'axios';
import { ref, reactive } from 'vue';
import CryptoJS from 'crypto-js'

const loginError = ref<Boolean>(false);
const data = reactive( { username: "", password: "" } );
const userStore = useUserStore();

async function login(): Promise<void> {
    try{
        const res = (await axios.get("http://localhost:3000/users/login", {
            params: {
                username: data.username,
                password: CryptoJS.SHA3(data.password)
            }})
        ).data

        userStore.login(data.username, res.token);
        router.push('/')
    } catch (err) {
        console.log("ERR: " + err)
        loginError.value = true;
    }
}
</script>