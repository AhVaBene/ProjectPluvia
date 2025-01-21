<script setup lang="ts">

const dangerIcon = "fa fa-exclamation-circle fa-lg riskLevel"
const props = defineProps(["riskLevel"])
const risksString = ["Low", "Medium", "High", "Do not validate"]

const emits = defineEmits(["verificationClick"])
</script>

<template>
    <div class="text-center" @click="$emit('verificationClick', props.riskLevel)">
        <i :class="dangerIcon + props.riskLevel"></i>
        <p>{{ risksString[props.riskLevel-1] }}</p>
    </div>
</template>