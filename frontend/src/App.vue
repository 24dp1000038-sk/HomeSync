<script setup>
import { RouterView } from 'vue-router';
import Navbar from "@/components/Navbar.vue";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

</script>

<template>
  <div>
    <Navbar/>
    <RouterView/>
  </div>
</template>