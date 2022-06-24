import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '@/components/mainpage'
import Wuliuquery from '@/components/query/Wuliuquery'
import Wuliumanage from '@/components/manage/Wuliumanage'
import Wuliusql from '@/components/sql/Wuliusql'
import Productsedit from '@/components/manage/products/Productsedit'
import Productsinfo from '@/components/manage/products/Productsinfo'
import Productsinsert from '@/components/manage/products/Productsinsert'
import Nodesedit from '@/components/manage/nodes/Nodesedit'
import Nodesinfo from '@/components/manage/nodes/Nodesinfo'
import Nodesinsert from '@/components/manage/nodes/Nodesinsert'
import Edgesedit from '@/components/manage/edges/Edgesedit'
import Edgesinfo from '@/components/manage/edges/Edgesinfo'
import Edgesinsert from '@/components/manage/edges/Edgesinsert'


// Vue use Router
Vue.use(Router)

// export Router
export default new Router({
  routes: [{
    path: '/',
    name: 'mainpage',
    component: mainpage
  },
  {
    path: '/main',
    name: 'main',
    component: mainpage
  },
  {
    path: '/query/query',
    name: 'query/Wuliuquery',
    component: Wuliuquery
  },
  {
    path: '/manage/manage',
    name: 'manage/Wuliumanage',
    component: Wuliumanage
  },
  {
    path: '/sql/sql',
    name: 'sql/Wuliusql',
    component: Wuliusql
  },
  {
    path: '/manage/products/edit',
    name: 'manage/products/Productsedit',
    component: Productsedit
  },
  {
    path: '/manage/products/info',
    name: 'manage/products/Productsinfo',
    component: Productsinfo
  },
  {
    path: '/manage/products/insert',
    name: 'manage/products/Productsinsert',
    component: Productsinsert
  },
  {
    path: '/manage/nodes/edit',
    name: 'manage/nodes/Nodesedit',
    component: Nodesedit
  },
  {
    path: '/manage/nodes/info',
    name: 'manage/nodes/Nodesinfo',
    component: Nodesinfo
  },
  {
    path: '/manage/nodes/insert',
    name: 'manage/nodes/Nodesinsert',
    component: Nodesinsert
  },
  {
    path: '/manage/edges/edit',
    name: 'manage/edges/Edgesedit',
    component: Edgesedit
  },
  {
    path: '/manage/edges/info',
    name: 'manage/edges/Edgesinfo',
    component: Edgesinfo
  },
  {
    path: '/manage/edges/insert',
    name: 'manage/edges/Edgesinsert',
    component: Edgesinsert
  },
  {
    path: '/manage/nodes/edit/:id',
    name: 'manage/nodes/Nodesedit',
    component: Nodesedit
  },
  {
    path: '/manage/edges/edit/:id',
    name: 'manage/edges/Edgesedit',
    component: Edgesedit
  },
  {
    path: '/manage/products/edit/:id',
    name: 'manage/products/Productsedit',
    component: Productsedit
  },
  ]
})
