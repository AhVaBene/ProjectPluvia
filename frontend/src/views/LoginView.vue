<template>
<div class="text-center">
    <img src="../assets/img/water.png"
    style="width: 185px;" alt="logo">
    <h1 class="mt-1 mb-5 pb-1">Pluvia</h1>
</div>
<form @submit.prevent="login">
    <p class="text-center">Please login to your account</p>
    <!-- Username input -->
    <div class="form-outline mb-4" data-mdb-input-init>
        <MDBInput v-model="data.username" label="Username" id="username" />
    </div>

    <!-- Password input -->
    <div data-mdb-input-init class="form-outline mb-4">
        <MDBInput v-model="data.password" label="Password" type="password" id="password" />
    </div>

    <!-- Submit button -->
    <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Sign in</button>

    <!-- Register buttons -->
    <div class="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
    </div>
</form>
</template>

<script setup lang="ts">
import { MDBInput } from 'mdb-vue-ui-kit';
import { useUserStore } from '@/stores/user';
import  router  from '@/router/'
import axios from 'axios';
import { reactive } from 'vue';


const data = reactive( { username: "", password: "" } );
const userStore = useUserStore();

const login = async () => {
    try{
        const res = (await axios.get("http://localhost:3000/users/login", {
            params: {
                username: data.username,
                password: data.password,
            }})
        ).data

        userStore.login(data.username, res.token);
        router.push('/')
    } catch (err) {
        console.log("ERR: " + err)
    }
}
</script>