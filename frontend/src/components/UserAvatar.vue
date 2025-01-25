<script setup lang="ts">
import { mdbRipple } from 'mdb-vue-ui-kit'
import { computed } from 'vue';

const vMdbRipple = mdbRipple

const props = defineProps(['iconNumber', 'event', 'iconSelected'])

const iconPath = computed<string>(() => "src/assets/img/profile_pictures/p_icon" + props.iconNumber + ".png")
const selectedClass = computed<string>(() => props.iconSelected == props.iconNumber ? 'selected' : '')
</script>

<template>
<a v-mdb-ripple="{ color: 'light' }" v-on:click="$props.event">
    <img
    alt="profile picture avatar"
    :class="selectedClass"
    class="img-fluid"
    :src="iconPath"
    style="border-radius: 50%;"
    />
</a>
</template>

<style>
.selected {
    border: 5px solid #00fd04;
}
</style>