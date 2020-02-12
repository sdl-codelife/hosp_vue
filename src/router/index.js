import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import UserInfo from '../views/UserInfo.vue'
import UserList from '../views/UserList.vue'
import MedicineList from '../views/MedicineList.vue'
import PetList from '../views/PetList.vue'
import Message from '../views/Message.vue'
import Swagger from '../components/swagger.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  {
    path: '/home', component: Home,
    children: [
      { path: '/userinfo', component: UserInfo },
      { path: '/userlist', component: UserList },
      { path: '/medicinelist', component: MedicineList },
	  { path: '/petlist', component: PetList },
	  { path: '/meassage', component: Message },
	  { path: '/swagger', component: Swagger }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
