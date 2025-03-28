<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const message = ref('Loading...');
const fetchData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/');
    message.value = response.data.message;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  fetchData();
});
</script>
