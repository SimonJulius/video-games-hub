import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Video",
    component: Home,
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import("../views/Contact.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
