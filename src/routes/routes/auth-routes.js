import Logon from '../../views/auth/Logon'
import Register from '../../views/auth/Register'
import Forgot from '../../views/auth/Forgot'
import MainDashboard from "../../views/dashboard/MainDashboard";
import Preloader from "../../views/auth/Preloader";
import BeforeLoader from "../../views/auth/BeforeLoader";
import PageNotFound from "../../views/auth/PageNotFound";
import PersonalProfile from "../../views/user/PersonalProfile";

export default [
    {
        path: '/',
        name: 'Logon',
        meta: {layout: 'auth',authRequired:false},
        component: Logon,
    },
    {
        path: '/personal-profile',
        name: 'PersonalProfile',
        meta: {layout: 'on-boarding',authRequired:true},
        component: PersonalProfile,
    },
    {
        path: '/preloader',
        name: 'Preloader',
        meta: {layout: 'loader',authRequired:false},
        component: Preloader,
    },
    {
        path: '/beforeloader',
        name: 'BeforeLoader',
        meta: {layout: 'loader',authRequired:false},
        component: BeforeLoader,
    },
    {
        path: '/register',
        name: 'Register',
        meta: {layout: 'auth',authRequired:false},
        component: Register,
    },
    {
        path: '/forgot-password',
        name: 'Forgot',
        meta: {layout: 'auth',authRequired:false},
        component: Forgot,
    },
    {
        path: '*',
        name: 'PageNotFound',
        meta: {layout: '404',authRequired:false},
        component: PageNotFound,
    }
];
