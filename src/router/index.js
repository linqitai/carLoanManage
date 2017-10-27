import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login'
import Home from '../components/Home'
import firstPage from '../pages/common/firstPage'
import NoPage from '../pages/common/NoPage'
import user from '../pages/Manage/user'
import role from '../pages/Manage/role'
// 臻车贷
import Mileage from '../pages/zcd/Mileage/Mileage'
import sysAnalysis from '../pages/zcd/sysAnalysis/sysAnalysis'
import comCalculation from '../pages/zcd/comCalculation/comCalculation'
// 臻e贷
import zedMileage from '../pages/zed/Mileage/Mileage'
import zedSysAnalysis from '../pages/zed/sysAnalysis/sysAnalysis'
import zedComCalculation from '../pages/zed/comCalculation/comCalculation'
// 臻商分
import zsfMileage from '../pages/zsf/Mileage/Mileage'
import zsfSysAnalysis from '../pages/zsf/sysAnalysis/sysAnalysis'
import zsfComCalculation from '../pages/zsf/comCalculation/comCalculation'
// 大数据
import bdBig from '../pages/dsj/Mileage/Mileage'
import bdSysAnalysis from '../pages/dsj/sysAnalysis/sysAnalysis'
import bdComCalculation from '../pages/dsj/comCalculation/comCalculation'

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
          path: '/sysAnalysis',
          name: 'sysAnalysis',
          component: sysAnalysis
        },
        {
          path: '/comCalculation',
          name: 'comCalculation',
          component: comCalculation
        },
        {
          path: '/NoPage',
          name: 'NoPage',
          component: NoPage
        },
        {
          path: '/firstPage',
          name: 'firstPage',
          component: firstPage
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
          path: '/zedMileage',
          name: 'zedMileage',
          component: zedMileage
        },
        {
          path: '/zedSysAnalysis',
          name: 'zedSysAnalysis',
          component: zedSysAnalysis
        },
        {
          path: '/zedComCalculation',
          name: 'zedComCalculation',
          component: zedComCalculation
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
        },
        {
          path: '/zsfSysAnalysis',
          name: 'zsfSysAnalysis',
          component: zsfSysAnalysis
        },
        {
          path: '/zsfComCalculation',
          name: 'zsfComCalculation',
          component: zsfComCalculation
        }
      ]
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/bdBig',
          name: 'bdBig',
          component: bdBig
        },
        {
          path: '/bdSysAnalysis',
          name: 'bdSysAnalysis',
          component: bdSysAnalysis
        },
        {
          path: '/bdComCalculation',
          name: 'bdComCalculation',
          component: bdComCalculation
        }
      ]
    }
  ]
})
