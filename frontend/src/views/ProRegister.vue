<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="container col-md-4 col-md-offset-4">
  <div class="card border-info shadow-lg p-3 mb-5 bg-white rounded mt-3">
    <form method="Post">
      <h3 align="center">Service Professional Signup</h3>
      <div class="form-group">
        <label for="email">Email (username)</label>
        <input
          id="email"
          name="email"
          class="form-control"
          placeholder="example@gmail.com"
          type="email"
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
        />
      </div>
      <div class="form-group">
        <label for="name">Full name</label>
        <input
          id="name"
          name="name"
          class="form-control"
          placeholder="Name"
          type="text"
        />
      </div>
      <div class="form-group">
        <label for="service">Service Name</label>
        <input
          id="service"
          name="service"
          class="form-control"
          placeholder="Name"
          type="text"
        />
      </div>
      <div class="form-group">
        <label for="experience">Experience(in yrs)</label>
        <input
          id="experience"
          name="name"
          class="form-control"
          placeholder="0"
          type="number"
        />
      </div>
      <div class="form-group">
        <label for="docs">Attach documents (single pdf)</label>
        <input
          id="docs"
          name="docs"
          class="form-control"
          placeholder="File upload"
          type="file"
          accept=".pdf"
        />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input
          id="address"
          name="address"
          class="form-control"
          placeholder="Address"
          type="text"
        />
      </div>
      <div class="form-group">
        <label for="pincode">Pincode</label>
        <input
          id="pincode"
          name="pincode"
          class="form-control"
          placeholder="pincode"
          type="text"
        />
      </div>
      <br />
      <button type="submit" class="btn btn-outline-success">Submit</button>
      <RouterLink to="./login" class="ms-5">Existing Professional?</RouterLink>
    </form>
  </div>
</div>
</template>