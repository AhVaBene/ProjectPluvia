<script setup lang="ts">
import { MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-vue-ui-kit'
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import UserAvatar from './UserAvatar.vue';

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
const userStore = useUserStore()
const selectedIcon = ref<number>(0)

const onAvatarClicked = () => {
    avatarModal.value = !avatarModal.value
}

const onAvatarChanged = (newIcon: number) => {
    selectedIcon.value = newIcon
}

const onModalClose = async (isSave: boolean) => {
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
        selectedIcon.value = user.value.avatarPicture
    }
    onAvatarClicked()
}

const getUser = async () => {
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
    <div class="w-50 pt-3">
        <UserAvatar :event="onAvatarClicked" :icon-number="user.avatarPicture" :iconSelected="0"/>
    </div>
</div>
<h1>{{ user.username }}</h1>
<div v-for="location in user.locations">
    <h2>{{ location.address }}</h2>
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