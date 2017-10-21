import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login'
import Home from '../components/Home'
import Mileage from '../pages/zcd/Mileage/Mileage'
import zsfMileage from '../pages/zsf/Mileage/Mileage'
import NoPage from '../pages/common/NoPage'
import user from '../pages/Manage/user'
import role from '../pages/Manage/role'

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
        },
        {
          path: '/NoPage',
          name: 'NoPage',
          component: NoPage
        },
        {
          path: '/user',
          name: 'user',
          component: user
        },
        {
          path: '/role',
          name: 'role',
          component: role
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
