import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Task from '../views/Task.vue'
import Review from '../views/Review.vue'
import Reviews from '../views/Reviews.vue'
import Texts from '../views/Texts.vue'
import Authorization from '../views/Authorization.vue'
import SignUp from '../views/SignUp.vue'
import SeasonSignUp from '../views/SeasonSignUp.vue'
import axios from "axios"
import VueAxios from 'vue-axios'

Vue.use(VueRouter)
Vue.use(VueAxios,axios)
const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Authorization
  },
  {
    path: '/review',
    name: 'Review',
    component: Review
  },
  {
    path: '/task',
    name: 'Task',
    component: Task
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: Reviews
  },
  {
    path: '/texts',
    name: 'texts',
    component: Texts
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: SignUp
  },
  {
    path: '/seasonSignUp',
    name: 'Season Sign Up',
    component: SeasonSignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
