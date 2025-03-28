<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
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

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    localStorage.setItem("token", data.access_token.toString());
    localStorage.setItem("role", data.role);
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("role"));

    const role = data.role;
    if (role === "user") {
      router.push("/user_page");
    } else if (role === "pro") {
      router.push("/pro_page");
    } else if (role === "admin") {
      router.push("/admin_page");
    }

  } catch (error) {
    errorMessage.value = error.message;
  }
};

</script>


<template>
  <div>
    <div class="container col-md-4 col-md-offset-4">
      <div class="card border-info shadow-lg p-3 mb-5 bg-white rounded mt-3">
        <form @submit.prevent="handleLogin">
          <h3 class="text-center">Login</h3>
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
              v-model="email"
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
              v-model="password"
            />
            <i><img :src="eyeClose" id="eyeIcon" alt="eyeClose" @click="togglePass" /></i>
          </div>
          <br />
          <button type="submit" class="btn btn-outline-success">Login</button>
          <RouterLink to="./user-register" class="ms-4">Create Account?</RouterLink>
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

