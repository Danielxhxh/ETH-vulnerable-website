import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/homepage.vue"),
    },
    {
      path: "/shop",
      component: () => import("../views/shop.vue"),
    },
    {
      path: "/login",
      component: () => import("../views/login.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/register.vue"),
    },
    {
      path: "/profile",
      component: () => import("../views/profile.vue"),
    },
    {
      path: "/cart",
      component: () => import("../views/cart.vue"),
    },
    {
      path: "/shop/:product",
      component: () => import("../views/productdetails.vue"),
      props: true,
    },
    {
      path: "/monitor",
      component: () => import("../views/monitor.vue"),
    },
  ],
});
