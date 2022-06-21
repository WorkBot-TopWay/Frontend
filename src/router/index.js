
import { createRouter, createWebHistory } from 'vue-router'

import ClimbingGym from "../topway/pages/home/ClimbingGym.vue"
import ClimbingWallDetails from "../topway/pages/home/ClimbingWallDetails.vue";
import SingUp from "../topway/pages/signin/SingUp.vue";
import SignUpClimber from "../topway/pages/signin/SignUpClimber.vue";
import LogIn from "../topway/pages/login/LogIn.vue";
import Join_League from "../topway/pages/leagues/Join_League.vue";
import LeagueDetails from "../topway/pages/leagues/LeagueDetails.vue";
import Ranking_League from "../topway/pages/leagues/Ranking_League.vue";
import FavoriteScaler from "../topway/pages/scaler/FavoriteScaler.vue";
import My_Profile from "../topway/pages/scaler/My_Profile.vue";
import ClimbingGymHome from "../topway/pages/gym/ClimbingGymHome.vue";
import New_League from "../topway/pages/leagues/New_League.vue";
import ClimbingGymRanking from "../topway/pages/gym/ClimbingGymRanking.vue";
import My_Leagues from "../topway/pages/leagues/My_Leagues.vue";
import SignUpClimberGym from "../topway/pages/signin/SignUpClimberGym.vue";
import Gym_Profile from "../topway/pages/gym/Gym_Profile.vue";

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
    }
    ,
    {
      path: '/singUpClimberGym',
      name: 'singUpClimberGym',
      component: SignUpClimberGym
    }
    ,
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
      path:'/MyProfile',
      name: "MyProfile",
      component: My_Profile
    },
    {
      path:'/climbing-gym',
      name:'ClimbingGymHome',
      component: ClimbingGymHome
    },
    {
      path:'/:name/competition/:id',
      name:'RankingCompetition',
      component: ClimbingGymRanking
    },
    {
      path:'/ViewMode',
      name:'ViewMode',
      component: ClimbingWallDetails
    },
    {
      path:'/Profile',
      name: "Profile",
      component: Gym_Profile
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
