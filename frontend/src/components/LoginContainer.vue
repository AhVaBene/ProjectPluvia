<template>
    <form @submit.prevent="login">
    <p class="text-center">Please login to your account</p>
    <p v-if="loginError" class="text-danger">Login failed: try again</p>
    <!-- Username input -->
    <MDBInput required v-model="data.username" label="Username" id="username" wrapperClass="mb-3" />

    <!-- Password input -->
    <MDBInput required v-model="data.password" label="Password" type="password" id="password" wrapperClass="mb-3" />

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

const loginError = ref<Boolean>(false);
const data = reactive( { username: "", password: "" } );
const userStore = useUserStore();

const login = async () => {
    try{
        const res = (await axios.get("http://localhost:3000/users/login", {
            params: {
                username: data.username,
                password: CryptoJS.AES.encrypt(data.password, "Secret Passphrase").toString(),
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