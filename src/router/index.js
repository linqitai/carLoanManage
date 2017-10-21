import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login'
import Home from '../components/Home'
import Mileage from '../pages/Mileage/Mileage'
import zsfMileage from '../pages/zsf/Mileage/Mileage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/mileage',
          name: 'Mileage',
          component: Mileage
        }
      ]
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/zsfMileage',
          name: 'zsfMileage',
          component: zsfMileage
        }
      ]
    }
  ]
})
