export default {
    template: `
    <div class="container-fluid min-vh-100 bg-light d-flex flex-column">
    <link rel="stylesheet" href="../static/css/nav.css">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm py-2 nav-sec">
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
              <form @submit.prevent="handleSubmit">
                <h3 class="text-center mb-4">Service Professional Signup</h3>
                
                <div class="row g-3">
                  <!-- Email -->
                  <div class="col-12">
                    <label for="email" class="form-label">Email (username)</label>
                    <input id="email" name="email" class="form-control" placeholder="example@gmail.com" type="email" required>
                  </div>
                  
                  <!-- Password -->
                  <div class="col-12 col-md-6">
                    <label for="password" class="form-label">Password</label>
                    <input id="password" name="password" class="form-control" placeholder="password" type="password" required>
                  </div>
                  
                  <!-- Confirm Password -->
                  <div class="col-12 col-md-6">
                    <label for="password2" class="form-label">Password (Confirm)</label>
                    <input id="password2" name="password2" class="form-control" placeholder="password" type="password" required>
                  </div>
                  
                  <!-- Full Name -->
                  <div class="col-12">
                    <label for="name" class="form-label">Full name</label>
                    <input id="name" name="name" class="form-control" placeholder="Name" type="text" required>
                  </div>
                  
                  <!-- Service Type -->
                  <div class="col-12">
                    <label for="service" class="form-label">Service Type</label>
                    <select class="form-select" id="service" name="service" required>
                      <option selected disabled value="">Choose any</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="cleaning">Cleaning</option>
                    </select>
                  </div>
                  
                  <!-- Experience -->
                  <div class="col-12 col-md-6">
                    <label for="experience" class="form-label">Experience (in yrs)</label>
                    <input id="experience" name="experience" class="form-control" placeholder="0" type="number" min="0" required>
                  </div>
                  
                  <!-- Pin Code -->
                  <div class="col-12 col-md-6">
                    <label for="pinCode" class="form-label">Pin Code</label>
                    <input id="pinCode" name="pinCode" class="form-control" placeholder="pin code" type="text" pattern="[0-9]{6}" required>
                  </div>
                  
                  <!-- Address -->
                  <div class="col-12">
                    <label for="address" class="form-label">Address</label>
                    <textarea id="address" name="address" class="form-control" placeholder="Address" rows="2" required></textarea>
                  </div>
                  
                  <!-- Buttons -->
                  <div class="col-12 mt-4 d-flex flex-column flex-sm-row justify-content-between gap-3">
                    <button type="submit" class="btn btn-outline-success flex-grow-1">Submit</button>
                    <router-link to="./login" class="btn btn-outline-primary flex-grow-1">Existing Professional?</router-link>
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
}