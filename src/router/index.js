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
import DoctorIndex from '../views/doctor/DoctorIndex.vue'

import Index from "../views/Index.vue";
import UserPet from "../views/user/UserPet.vue";
import RegistForm from "../views/user/RegistForm.vue";
import OrderFrom from "../views/user/OrderForm.vue";
import OrderComp from "../views/user/OrderComp.vue";

import userhome from "../views/user/userhomepage.vue";
import userinfo from "../views/user/userinfo.vue";

import MarkDown from '../views/admin/MarkDown.vue'

import Contact from '../views/website/Contact.vue'
import News from '../views/website/News.vue'
import Team from '../views/website/Team.vue'
import test from '../views/test.vue'
Vue.use(VueRouter);
const routes = [
  { path: "/test", component: test },
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
      { path: "/contact", component: Contact },
      { path: "/news", component: News },
      { path: "/team", component: Team },
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
      { path: "/systemmessage", component: SystemMessage },
      { path: "/doctorindex", component: DoctorIndex },
      { path: "/mark", component: MarkDown }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
