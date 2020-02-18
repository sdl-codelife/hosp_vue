import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import UserInfo from "../views/UserInfo.vue";
import UserList from "../views/UserList.vue";
import MedicineList from "../views/MedicineList.vue";
import PetList from "../views/PetList.vue";
import Message from "../views/Message.vue";
import Swagger from "../components/swagger.vue";
import Banner from '../views/Banner.vue'

import Index from '../views/Index.vue'
import UserPet from '../views/user/UserPet.vue'
import RegistForm from '../views/user/RegistForm.vue'
import OrderFrom from '../views/user/OrderForm.vue'
Vue.use(VueRouter);
const routes = [
  {path:'/index',component:Index},
  {path:'/login',component:Login},
  { path: "/",
   component: Index, 
   
  },
  {
    path: "/home",
    component: Home,
    children: [
      { path: "/userinfo", component: UserInfo },
      { path: "/userlist", component: UserList },
      { path: "/medicinelist", component: MedicineList },
      { path: "/petlist", component: PetList },
      { path: "/message", component: Message },
      { path: "/swagger", component: Swagger },
      { path: "/banner", component: Banner },
      { path: "/userpet", component: UserPet },
      { path: "/registform", component: RegistForm },
      { path: "/orderlist", component: OrderFrom }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
