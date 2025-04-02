export default {
  template: `
  <div class="container-fluid min-vh-100 bg-light d-flex flex-column">
    <link rel="stylesheet" href="../static/css/nav.css">
    <nav class="navbar navbar-expand-lg navbar-dark nav-color fixed-top py-2">
      <div class="container">
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <i class="bi bi-house-heart-fill me-2 fs-4"></i>
          <span class="fw-bold fs-4" style="letter-spacing: 0.5px;">HouseSync</span>
        </router-link>
        <div class="ms-auto">
          <router-link to="/login" class="btn btn-outline-light px-3 px-sm-4 rounded-pill">
            <i class="bi bi-box-arrow-in-right me-1 me-sm-2"></i>
            <span class="d-none d-sm-inline">Login</span>
          </router-link>
        </div>
      </div>
    </nav>
    <main class="flex-grow-1 d-flex align-items-center py-5 mt-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8 col-xl-6">
            <div class="card border-primary shadow-lg p-3 p-md-4 bg-white rounded">
              <form @submit.prevent="addUser">
                <h3 class="text-center mb-4">Customer Signup</h3>
                <div v-if="errorMessage" class="alert alert-danger">
                  {{ errorMessage }}
                </div>
                <div class="row g-3">
                  <div class="col-12">
                    <label for="email" class="form-label">Email (username)</label>
                    <input 
                      id="email" 
                      class="form-control" 
                      placeholder="example@gmail.com" 
                      type="email" 
                      required
                      autofocus
                      v-model="formData.email"
                    >
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="password" class="form-label">Password</label>
                    <input
                      id="password"
                      class="form-control"
                      placeholder="password"
                      type="password"
                      required
                      v-model="formData.password"
                      minlength="5"
                    >
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="password2" class="form-label">Confirm Password</label>
                    <input
                      id="password2"
                      class="form-control"
                      placeholder="password"
                      type="password"
                      required
                      v-model="formData.password2"
                      minlength="5"
                    >
                  </div>
                  <div class="col-12">
                    <label for="name" class="form-label">Full Name</label>
                    <input 
                      id="name" 
                      class="form-control" 
                      placeholder="Name" 
                      type="text" 
                      required
                      v-model="formData.name"
                    >
                  </div>
                  <div class="col-12">
                    <label for="address" class="form-label">Address</label>
                    <textarea
                      id="address"
                      class="form-control"
                      placeholder="Address"
                      rows="2"
                      required
                      v-model="formData.address"
                    ></textarea>
                  </div>
                  <div class="col-12">
                    <label for="phone" class="form-label">Phone No:</label>
                    <input
                      id="phone"
                      class="form-control"
                      placeholder="phone number"
                      type="tel"
                      pattern="[0-9]{10}"
                      title="Please enter a 10-digit phone number"
                      required
                      v-model="formData.phone"
                    >
                  </div>
                  <div class="col-12 mt-4 d-flex flex-column flex-sm-row justify-content-between gap-3">
                    <button 
                      type="submit" 
                      class="btn btn-outline-success flex-grow-1"
                      :disabled="isLoading"
                    >
                      <span v-if="!isLoading">Submit</span>
                      <span v-else>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Processing...
                      </span>
                    </button>
                    <router-link to="/login" class="btn btn-outline-primary flex-grow-1">Existing user?</router-link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  `,
  data() {
    return {
      formData: {
        email: "",
        password: "",
        password2: "",
        name: "",
        address: "",
        phone: "",
      },
      isLoading: false,
      errorMessage: ""
    };
  },
  methods: {
    async addUser() {
      if (this.formData.password !== this.formData.password2) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      if (this.formData.password.length < 5) {
        this.errorMessage = "Password must be at least 5 characters";
        return;
      }

      if (!/^\d{10}$/.test(this.formData.phone)) {
        this.errorMessage = "Please enter a valid 10-digit phone number";
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.formData.email,
            password: this.formData.password,
            password2: this.formData.password2,
            name: this.formData.name,
            address: this.formData.address,
            phone: this.formData.phone
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        if (data.auth_token) {
          localStorage.setItem("auth_token", data.auth_token);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("user_role", "user");
        }

        this.$router.push("/user_dashboard");
        
      } catch (error) {
        this.errorMessage = error.message || "Registration failed. Please try again.";
        console.error("Registration error:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};