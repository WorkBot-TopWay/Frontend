import { createRouter, createWebHistory } from "vue-router";

import ClimbingGym from "../components/ClimbingGym.vue";
import ClimbingWallDetails from "../components/ClimbingWallDetails.vue";
import Login from "../components/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ClimbingGym,
    },
    {
      path: "/features/:id/:name",
      name: "features",
      component: ClimbingWallDetails,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    /* ,
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
  ],
});

export default router;
