<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { MDBNavbar, MDBNavbarItem, MDBNavbarNav, MDBIcon, MDBBadge } from 'mdb-vue-ui-kit';
import { useRoute } from 'vue-router';

const notifications = ref(0);
const route = useRoute();
const routeName = computed(() => route.path)

const secondaryTopBarRoutes = ["/notifications", "/profile"]
</script>

<template>
<MDBNavbar expand="lg" light bg="light" container position="sticky-top" class="border-bottom pb-1">
  <MDBNavbarNav left class="mx-2">
    
    <MDBNavbarItem v-if="!secondaryTopBarRoutes.includes(routeName)" to="/notifications" active >
      <MDBIcon icon="bell" size="lg" />
      <MDBBadge pill notification badge="danger">{{ notifications }}</MDBBadge>
    </MDBNavbarItem>

    <MDBNavbarItem to="/" active v-else>
      <MDBIcon class="fa fa-arrow-left" size="lg" />
    </MDBNavbarItem>

  </MDBNavbarNav>
  <MDBNavbarNav class="mx-auto">
    <MDBNavbarItem>
      <h1>Pluvia</h1>
    </MDBNavbarItem>
  </MDBNavbarNav>
  <MDBNavbarNav right class="mx-2"> 
    
    <MDBNavbarItem v-if="!secondaryTopBarRoutes.includes(routeName)" to="/profile" active >
      <MDBIcon icon="user" size="lg"/>
    </MDBNavbarItem>

    <MDBNavbarItem v-else :to="routeName" class="invisible">
      <MDBIcon class="fa fa-arrow-left" size="lg" />
    </MDBNavbarItem>

  </MDBNavbarNav>
</MDBNavbar>
</template>