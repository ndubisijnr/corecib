import Logon from '../../views/auth/Logon'
import SignUp from '../../views/auth/SignUp'
import ForgotPassword from '../../views/auth/ForgotPassword'


export default [
    {
        path: '/',
        name: 'Logon',
        meta: {layout: 'auth',authRequired:false},
        component: Logon,
    },
    {
        path: '/signup',
        name: 'SignUp',
        meta: {layout: 'loader',authRequired:false},
        component: SignUp
    },
    {
        path: '/password-reset',
        name: 'ForgotPassword',
        meta: {layout: 'loader',authRequired:false},
        component: ForgotPassword
    },
];
