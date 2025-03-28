<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const password2 = ref("");
const name = ref("");
const address = ref("");
const pincode = ref("");

const handleSubmit = async () => {
  if (password.value !== password2.value) {
    alert("Passwords do not match.");
    return;
  }

  const userData = {
    email: email.value,
    password: password.value,
    name: name.value,
    address: address.value, 
    phone: pincode.value,
  };

  try {
    const response = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      router.push("/login"); 
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("There was an error during registration:", error);
    alert("Failed to connect to the server.");
  }
};
</script>

<template>
  <div class="container col-md-4 col-md-offset-4">
    <div class="card border-info shadow-lg p-3 mb-5 bg-white rounded mt-3">
      <form @submit.prevent="handleSubmit">
        <h3 class="text-center">Customer Signup</h3>
        <div class="form-group">
          <label for="email">Email (username)</label>
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
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            class="form-control"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <div class="form-group">
          <label for="password2">Password (Confirm)</label>
          <input
            id="password2"
            name="password2"
            class="form-control"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <div class="form-group">
          <label for="name">Full Name</label>
          <input id="name" name="name" class="form-control" placeholder="Name" type="text" required/>
        </div>
        <div class="form-group">
          <label for="pincode">Address</label>
          <input
            id="address"
            name="address"
            class="form-control"
            placeholder="Address"
            type="text"
            required
          />
        </div>
        <div class="form-group">
          <label for="pincode">Pin code</label>
          <input
            id="pincode"
            name="pincode"
            class="form-control"
            placeholder="pincode"
            type="text"
            required
          />
        </div>
        <br />
        <button type="submit" class="btn btn-outline-success">Submit</button>
        <RouterLink to="./login" class="ms-5">Existing user?</RouterLink>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
