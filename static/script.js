import Home from './components/Home.js'
import Login from './components/Login.js'
import UserRegister from './components/UserRegister.js'
import ProRegister from './components/ProRegister.js'
import Navbar from './components/Navbar.js'

const routes = [
    { path: '/', component: Home},
    { path: '/login', component: Login},
    { path: '/user_register', component: UserRegister},
    { path: '/pro_register', component: ProRegister},
]

const router = new VueRouter({
    routes,
})

const app = new Vue({
    el: "#app",
    router,
    template: `
        <navbar></navbar>
        <router-view></router-view>
    `,
    data: {
        loggedIn: false
    },
    components:{
        "navbar": Navbar,
    },
    methods:{
    }
})
