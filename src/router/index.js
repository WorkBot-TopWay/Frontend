
import { createRouter, createWebHistory } from 'vue-router'

import ClimbingGym from "../components/ClimbingGym.vue"
import ClimbingWallDetails from "../components/ClimbingWallDetails.vue";
import SingUp from "../components/SingUp.vue";
import SignUpClimber from "../components/SignUpClimber.vue";
import LogIn from "../components/LogIn.vue";
import My_Leagues from "../components/My_Leagues.vue";
import Join_League from "../components/Join_League.vue";
import LeagueDetails from "../components/LeagueDetails.vue";
import New_League from "../components/New_League.vue";
import Ranking_League from "../components/Ranking_League.vue";
import FavoriteScaler from "../components/FavoriteScaler.vue";
import FormNews from "../components/FormNews.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ClimbingGym
    },
    {
      path: '/features/:id/:name',
      name: 'features',
      component: ClimbingWallDetails
    }
    ,
    {
      path: '/singUp',
      name: 'singUp',
      component: SingUp
    }
    ,
    {
      path: '/singUpClimber',
      name: 'singUpClimber',
      component: SignUpClimber
    },
    {
      path: '/LogIn',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/:name/:id/MyLeagues',
      name: 'MyLeagues',
      component: My_Leagues
    },
    {
      path: '/:name/:id/JoinLeague',
      name: 'JoinLeague',
      component: Join_League
    },
    {
      path: '/NewLeague/:name/:id',
      name: 'NewLeague',
      component: New_League
    },
    {
      path: '/:name/:title/:id',
      name: 'DetailsLeague',
      component: LeagueDetails
    },
    {
      path: '/Ranking/:name/:id',
      name: 'Ranking',
      component: Ranking_League
    },
    {
      path:'/Favorite',
      name:'Favorite',
      component: FavoriteScaler
    },
    {
      path:'/News',
      name:'News',
      component: FormNews
    }
    /* ,
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
  ]
})

export default router
