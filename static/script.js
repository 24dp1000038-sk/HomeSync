import Home from "./components/Home.js";
import Login from "./components/Login.js";
import UserRegister from "./components/UserRegister.js";
import ProRegister from "./components/ProRegister.js";
import Navbar from "./components/Navbar.js";
import UserDashboard from "./components/UserDashboard.js";
import ProDashboard from "./components/ProDashboard.js";
import AdminDashboard from "./components/AdminDashboard.js";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/user_register", component: UserRegister },
  { path: "/pro_register", component: ProRegister },
  { path: "/user_dashboard", component: UserDashboard },
  { path: "/admin_dashboard", component: AdminDashboard },
  { path: "/pro_dashboard", component: ProDashboard },
];

const router = new VueRouter({
  routes,
});

const app = new Vue({
  el: "#app",
  router,
  template: `
        <div class="container-fluid">
        <router-view></router-view>
        </div>
    `,
  data: {
    loggedIn: false,
  },
  components: {
    navbar: Navbar,
  },
  methods: {
    handleLogout() {
        this.loggedIn = false;
      },
      handleLogin(){
        this.loggedIn = true;
      }
  },
});
