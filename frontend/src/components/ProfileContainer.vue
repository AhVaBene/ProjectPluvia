<script setup lang="ts">
import { MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn, MDBIcon } from 'mdb-vue-ui-kit'
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import UserAvatar from './UserAvatar.vue';
import router from '@/router';

const userStore = useUserStore()

const user = ref({
    name: String,
    surname: String,
    username: String,
    password: String,
    admin: Number,
    locations: [{
        city: String,
        address: String,
        latitude: Number,
        longitude: Number,
        }
    ],
    avatarPicture: Number
})
const avatarModal = ref<boolean>(false)
const selectedIcon = ref<number>(0)
const activeLocationIndex = ref<number>(0)
const isAddLegal = computed<boolean>(() => user.value.locations.length < 5)

function onAvatarClicked(): void {
    avatarModal.value = !avatarModal.value
}

function onAvatarChanged(newIcon: number): void {
    selectedIcon.value = newIcon
}

async function onModalClose(isSave: boolean): Promise<void> {
    const newIcon = selectedIcon.value
    if(isSave) {
        const res = (await axios.put("http://localhost:3000/users/profile/" + userStore.user, {
            data: {
                avatarPicture: newIcon
            }
        })
        ).data
        user.value = res
    } else {
        selectedIcon.value = user.value.avatarPicture as unknown as number
    }
    onAvatarClicked()
}

function onAddLocation(): void {
    user.value.locations.push(user.value.locations[0])
}

async function onLocationChange(location: any): Promise<void> {
    const newLocation: {
        city: String,
        address: String,
        latitude: Number,
        longitude: Number,
        } = { 
            city: location.address_components[2].short_name,
            address: location.name,
            latitude: location.geometry.location.lat(),
            longitude: location.geometry.location.lng()
        }
    user.value.locations[activeLocationIndex.value] = newLocation
    const res = (await axios.put("http://localhost:3000/users/profile/" + userStore.user, {
        data: {
            locations: user.value.locations
        }
    })
    ).data
    user.value = res
}

async function deleteLocation(index: number): Promise<void> {
    user.value.locations.splice(index, 1); 
    const res = (await axios.put("http://localhost:3000/users/profile/" + userStore.user, {
        data: {
            locations: user.value.locations
        }
    })
    ).data
    user.value = res
}

function onLogoutClick(): void {
    userStore.logout()
    router.push('/')
}

async function getUser(): Promise<void> {
    try {
        const data = (await axios.get("http://localhost:3000/users/profile/" + userStore.user)).data
        user.value = data
        selectedIcon.value = data.avatarPicture
  } catch (e) {
    console.error(e)
  }
}

onMounted(getUser)
</script>

<template>
<div class="d-flex align-items-center justify-content-center">
    <div class="w-25 pt-3">
        <UserAvatar :event="onAvatarClicked" :icon-number="user.avatarPicture" :iconSelected="0"/>
    </div>
</div>

<div class="px-4 py-2">
    <h1>{{ user.username }}</h1>
    <h3>{{ user.name + " " + user.surname }}</h3>
</div>
<hr>
<div class="px-4 py-3">
    <div v-for="(location, index) in user.locations">
        <div class="d-flex flex-row" @click="activeLocationIndex = index">
            <GMapAutocomplete
                @place_changed="onLocationChange"
                class="form-control"
                :placeholder="(location.address + ', ' + location.city)">
            </GMapAutocomplete>
            
            <MDBBtn v-if="index==user.locations.length-1 && index!=0" color="danger" @click="deleteLocation(index)">
                <MDBIcon icon="trash-alt" size="lg"></MDBIcon>
            </MDBBtn>
        </div>

    </div>
    <div class="text-end mt-2">
        <MDBBtn :disabled="!isAddLegal" color="primary" rounded @click="onAddLocation">Add a favorite location</MDBBtn>
    </div>
</div>
<hr>
<div class="d-grid gap-2 col-9 mx-auto py-3" @click="onLogoutClick">
    <MDBBtn color="primary" rounded>Logout</MDBBtn>
</div>

<MDBModal
    id="avatarModal"
    labelledby="avatarModalLabel"
    v-model="avatarModal"
  >
    <MDBModalHeader :close="false">
      <MDBModalTitle id="avatarModalLabel"> Choose a profile picture </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
        <div class="d-flex m-2">
            <div @click="onAvatarChanged(1)"><UserAvatar event="" icon-number="1" :iconSelected="selectedIcon"></UserAvatar></div>
            <div @click="onAvatarChanged(4)"><UserAvatar event="" icon-number="4" :iconSelected="selectedIcon"></UserAvatar></div>
        </div>
        <div class="d-flex m-2">
            <div @click="onAvatarChanged(3)"><UserAvatar event="" icon-number="3" :iconSelected="selectedIcon"></UserAvatar></div>
            <div @click="onAvatarChanged(2)"><UserAvatar event="" icon-number="2" :iconSelected="selectedIcon"></UserAvatar></div>
        </div>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="onModalClose(false)">Discard changes</MDBBtn>
      <MDBBtn color="primary" @click="onModalClose(true)">Save changes</MDBBtn>
    </MDBModalFooter>
</MDBModal>
</template>

<style>
hr {
  text-align:center;
  margin: auto;
  border: none;
  height: 2px;
  width: 80%;
  background-color: black;  /* Modern Browsers */
}
</style>