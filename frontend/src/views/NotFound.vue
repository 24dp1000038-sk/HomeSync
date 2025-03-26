<template>
    <div class="container">
        <div class="text-center">
            <img :src="notFound" alt="404" />
            <h4>Sorry, the page you are looking for does not exist.</h4>
            <RouterLink to="/" class="btn btn-outline-success">Go Back</RouterLink>
        </div>
    </div>
</template>

<style scoped>
h4{
    color: red;
    font-size:20px;
    margin: 20px;

}
img{
    margin-top:30px;
    width:25%;
}
</style>

<script setup>
import { RouterLink } from "vue-router";
import notFound from "@/assets/error.png";
</script>