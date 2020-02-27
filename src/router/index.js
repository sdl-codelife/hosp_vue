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
import Banner from "../views/Banner.vue";

import RegistView from "../views/doctor/RegistView.vue";
import SeeRegist from "../views/doctor/SeeRegist.vue";
import SystemMessage from "../views/doctor/SystemMessage.vue"

import Index from "../views/Index.vue";
import UserPet from "../views/user/UserPet.vue";
import RegistForm from "../views/user/RegistForm.vue";
import OrderFrom from "../views/user/OrderForm.vue";
import OrderComp from "../views/user/OrderComp.vue";

import userhome from "../views/user/userhomepage.vue";
import userinfo from "../views/user/userinfo.vue";
Vue.use(VueRouter);
const routes = [
  { path: "/login", component: Login },
  {
    path: "/index",
    component: Index,
    children: [
      { path: "/userhome", component: userhome },
      { path: "/myuserinfo", component: userinfo },
      { path: "/registform", component: RegistForm },
      { path: "/userpet", component: UserPet },
      { path: "/orderlist", component: OrderFrom },
      
    ]
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
      { path: "/ordercomp", component: OrderComp },
      { path: "/registview", component: RegistView },
      { path: "/seeregist", component: SeeRegist },
      { path: "/systemmessage", component: SystemMessage }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
