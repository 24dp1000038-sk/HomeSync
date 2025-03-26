<template>
  <div>
    <div class="container col-md-4 col-md-offset-4">
      <div class="card border-info shadow-lg p-3 mb-5 bg-white rounded mt-3">
        <form @submit.prevent="handleLogin">
          <h3 align="center">Login</h3>
          <div class="form-group">
            <label for="email">Email (Username)</label>
            <input
              id="email"
              name="email"
              class="form-control"
              placeholder="example@gmail.com"
              type="email"
              required
              focus
            />
          </div>
          <div class="form-group password-container">
            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              class="form-control pe-5"
              placeholder="password"
              type="password"
              required
            />
            <i><img :src="eyeClose" id="eyeIcon" alt="eyeClose" @click="togglePass" /></i>
          </div>
          <br />
          <button type="submit" class="btn btn-outline-success">Login</button>
          <RouterLink to="./user-register" class="ms-4">Create Accout?</RouterLink>
          <RouterLink to="./pro-register" class="ms-4">Register as professional</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#eyeIcon {
  float: right;
  cursor: pointer;
  position: absolute;
  margin-left: auto;
  margin-top: -28px;
  right: 35px;
  z-index: 2;
}
img {
  width: 28px;
  height: 20px;
}
</style>

<script setup>
import { ref } from "vue";
import { RouterLink, router } from "vue-router";
import eyeOpen from "@/assets/eye-open.png";
import eyeClose from "@/assets/eye-close.png";

const eyeOpen_img = ref(eyeOpen);
const eyeClose_img = ref(eyeClose);

const togglePass = () => {
  const password = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");
  if (password.type === "password") {
    password.type = "text";
    eyeIcon.src = eyeOpen_img.value;
  } else {
    password.type = "password";
    eyeIcon.src = eyeClose_img.value;
  }
};

const name = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    // Store token and role in localStorage
    localStorage.setItem("token", data.access_token.toString());
    localStorage.setItem("role", data.role);

    // Navigate based on user role
    switch (data.role) {
      case "admin":
        router.push({ name: "admin_dashboard" }).then(() => {
          router.go(0); // Recommended Vue Router method for full page reload
        });
        break;
      case "customer":
        router.push({ name: "new_work" }).then(() => {
          router.go(0);
        });
        break;
      case "professional":
        router.push({ name: "discover" }).then(() => {
          router.go(0);
        });
        break;
      default:
        router.push({ name: "login" });
    }
  } catch (error) {
    errorMessage.value = error.message || "Login failed";
  } finally {
    loading.value = false;
  }
};

</script>
