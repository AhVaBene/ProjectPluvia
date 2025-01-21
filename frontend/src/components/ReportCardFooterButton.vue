<script setup lang="ts">

const dangerIcon = "fa fa-exclamation-circle fa-lg riskLevel"
const props = defineProps(["riskLevel"])
const risksString = ["Low", "Medium", "High", "Do not validate"]
</script>

<template>
    <div class="text-center">
        <i :class="dangerIcon + props.riskLevel"></i>
        <p>{{ risksString[props.riskLevel-1] }}</p>
    </div>
</template>
