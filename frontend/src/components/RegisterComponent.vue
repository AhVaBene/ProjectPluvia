<template>
<form @submit.prevent="register" class="px-4">
    <p class="text-center">Create a new account</p>
    <!-- Name input -->
    <MDBInput required v-model="data.name" label="Name" id="name" wrapperClass="mb-3"/>

    <!-- Surname input -->
    <MDBInput required v-model="data.surname" label="Surname" id="surname" wrapperClass="mb-3" />

    <!-- Username input -->
    <MDBInput required v-model="data.username" label="Username" id="username" wrapperClass="mb-3" />

    <!-- Password input -->
    <MDBInput required v-model="data.password" label="Password" type="password" id="password" wrapperClass="mb-3" />

    <!-- Location input TODO -->
    <GMapAutocomplete
        required
        @place_changed="onLocationChange"
        class="form-control mb-3">
    </GMapAutocomplete>

    <p v-if="registerError" class="text-danger">The username is already chosen. Please pick another one</p>

    <!-- Submit button -->
    <MDBBtn color="primary" block type="submit">Sign up</MDBBtn>
</form>
</template>

<script setup lang="ts">
import { MDBInput, MDBBtn } from 'mdb-vue-ui-kit';
import { useUserStore } from '@/stores/user';
import  router  from '@/router/'
import axios from 'axios';
import { ref, reactive } from 'vue';
import CryptoJS from 'crypto-js'

const registerError = ref<Boolean>(false);
const data = reactive( { name: "", surname: "", username: "", password: "" } );
const location = ref<{
        city: string,
        address: string,
        latitude: number,
        longitude: number,
}>()
const userStore = useUserStore();

function onLocationChange(loc: any): void {
    const newLocation: {
        city: string,
        address: string,
        latitude: number,
        longitude: number,
        } = { 
            city: loc.address_components[2].short_name,
            address: loc.name,
            latitude: loc.geometry.location.lat(),
            longitude: loc.geometry.location.lng()
        }
    location.value = newLocation
}

async function register(): Promise<void> {
    const isUsernameAvailabile: Boolean = await axios.get("http://localhost:3000/users/profile/" + data.username).then(() => false).catch(() => true)
    const params = {
        name: data.name,
        surname: data.surname,
        username: data.username,
        password: CryptoJS.SHA3(data.password).toString(),
        locations: [location.value],
        avatarPicture: 1
    }

    try{
        if(isUsernameAvailabile) {
            const res = (await axios.post("http://localhost:3000/users/register", {
                params: params
            })).data
    
            userStore.login(data.username, res.token);
            router.push('/')
        } else {
            registerError.value = true;
        }
    } catch (err) {
        console.log("ERR: " + err)
        registerError.value = true;
    }
}
</script>