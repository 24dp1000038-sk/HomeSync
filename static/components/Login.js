export default {
    template: `
    <div>
    <div class="container col-md-4 col-md-offset-4">
      <div class="card border-info shadow-lg p-3 mb-5 bg-white rounded mt-3">
        <form>
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
          <router-link to="./user_register" class="ms-4">Create Account?</router-link>
          <router-link to="./pro_register" class="ms-4">Register as professional</router-link>
        </form>
      </div>
    </div>
  </div>
    `
}