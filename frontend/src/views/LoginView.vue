<template>
    <div>
        <h1>LOGIN</h1>
        <form @submit.prevent="login">
            <input v-model="data.username" placeholder="username" />
            <br />
            <br />
            <input v-model="data.password" placeholder="password" type="password" />
            <br />
            <br />
            <button type="submit">Login</button>
        </form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
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
    } catch (err) {
        console.log("ERR: " + err)
    }
}
</script>