import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Management from '@/components/Management';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import Coupons from '@/components/pages/Coupons';
import Cart from '@/components/pages/Cart';
import CustomerOrder from '@/components/pages/CustomerOrders'
import ProductList from '@/components/pages/ProductList';
import CustomerCheckout from '@/components/pages/CustomerCheckout'
import AboutUs from '@/components/pages/About';
import Home from '@/components/pages/Home'
import Campaign from '@/components/pages/Campaign';
import Item from '@/components/pages/Item';
import Wish from '@/components/pages/Wish'



Vue.use(VueRouter)

const routes = [
    {
        name: 'Dashboard',
        path: '/',
        component: Dashboard,
        // meta: { requiresAuth: true }, // 路由訊息：需要被驗證才可進入，改到產品頁面使用
        children: [
            {
                name: 'Home',
                path: '',
                component: Home,
            },
            {
                name: 'About',
                path: 'about',
                component: AboutUs,
            },
            {
                name: 'Campaign',
                path: 'campaign',
                component: Campaign,
            },
            {
                name: 'ProductList',
                path: 'product_list',
                component: ProductList,
            },
            {
                name: 'Item',
                path: 'product/:id',
                component: Item,
            },
            {
                name: 'Login',
                path: 'login',
                component: Login,
            },
            {
                name: 'Cart',
                path: 'cart',
                component: Cart,
            },
            {
                name: 'Wish',
                path: 'wishlist',
                component: Wish,
            },
            {
                name: 'CustomerOrder',
                path: 'customer_order',
                component: CustomerOrder,
            },
            {
                name: 'CustomerCheckout',
                path: 'customer_checkout/:orderId',
                component: CustomerCheckout,
            },
        ]
    },
    // {
    //     // 為避免用戶通過直接輸入網址而進入不存在的頁面，我們可以將不存在的頁面路徑寫成星號'*'
    //     // 使用redirect並指向登入畫面：只要用戶進入了不存在的頁面，就會被重新導向登入畫面
    //     path: '*',
    //     redirect: '/login'
    // },
    {
        name: 'Management',
        path: '/admin',
        component: Management,
        // meta: { requiresAuth: true }, // 路由訊息：需要被驗證才可進入，改到產品頁面使用
        children: [
            {
                name: 'Products',
                path: 'products',
                component: Products,
                meta: { requiresAuth: true }, // 路由訊息：需要被驗證才可進入
            },
            {
                name: 'Orders',
                path: 'orders',
                component: Orders,
                meta: { requiresAuth: true },
            },
            {
                name: 'Coupon',
                path: 'coupon',
                component: Coupons,
                meta: { requiresAuth: true },
            },
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router
