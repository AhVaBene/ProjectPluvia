<script setup lang="ts">
import { mdbRipple } from 'mdb-vue-ui-kit'
import { computed } from 'vue';

const vMdbRipple = mdbRipple

const props = defineProps(['iconNumber', 'event', 'iconSelected'])

const iconPath = computed(() => "src/assets/img/profile_pictures/p_icon" + props.iconNumber + ".png")
const selectedClass = computed(() => props.iconSelected == props.iconNumber ? 'selected' : '')
</script>

<template>
<a v-mdb-ripple="{ color: 'light' }" v-on:click="$props.event">
    <img
    alt="profile picture avatar"
    :class="selectedClass"
    class="img-fluid"
    :src="iconPath"
    />
</a>
</template>

<style>
img {
  border-radius: 50%;
}
.selected {
    border: 5px solid #00fd04;
}
</style>