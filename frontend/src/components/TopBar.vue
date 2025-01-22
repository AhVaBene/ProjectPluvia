<script setup lang="ts">
import { onMounted, ref } from 'vue';
const notifications = ref(0);

const incrementNotifications = () =>{
  notifications.value += 1
}
</script>

<template>
    <nav class="navbar-fixed">
    <div class="container-fluid">
      <div class="button" @click="incrementNotifications">
        <i class="bi bi-bell"></i>
        <span class="button__badge">{{notifications}}</span>
      </div>
      <a class="navbar-brand" href="#">Pluvia</a>
      <div class="d-flex">
        <!-- <img src="https://via.placeholder.com/40" alt="Profile" class="rounded-circle" width="40" height="40"> -->
      </div>
    </div>
  </nav>
</template>

<style>
    .navbar-brand {
      margin-top:0.5em;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2em;
      color: white;
    }
    .navbar-fixed {
      background-color: #242424;
      position: fixed; /* Set the navbar to fixed position */
      top: 0; /* Position the navbar at the top of the page */
      left:0;
      width: 100%; /* Full width */
      border-bottom: 2px solid black;
      margin-bottom: 5em;
    }

    /* Define what each icon button should look like */
    .button {
      color: white;
      display: inline-block; /* Inline elements with width and height. TL;DR they make the icon buttons stack from left-to-right instead of top-to-bottom */
      position: relative; /* All 'absolute'ly positioned elements are relative to this one */
      padding: 2px 5px; /* Add some padding so it looks nice */
      float: left;
      margin-bottom: 2em;
      margin-top:1em;
    }

    /* Make the badge float in the top right corner of the button */
    .button__badge {
      background-color: #fa3e3e;
      border-radius: 2px;
      color: white;
      padding: 1px 3px;
      font-size: 10px;
      position: absolute; /* Position the badge within the relatively positioned button */
      top: 0;
      right: 0;
    }

  </style>