import Logon from '../../views/auth/Login'
import SignUp from '../../views/auth/SignUp'
import ForgotPassword from '../../views/auth/ForgotPassword'
import SignUpUser from '../../views/auth/SignUpUser'


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
        meta: {layout: 'auth',authRequired:false},
        component: SignUp
    },
    {
        path: '/signup/:referralCode',
        name: 'ReferralSignUp',
        meta: {layout: 'auth',authRequired:false},
        component: SignUp
    },
    {
        path: '/password-reset',
        name: 'ForgotPassword',
        meta: {layout: 'auth',authRequired:false},
        component: ForgotPassword
    },
    {
        path: '/invite',
        name: 'SignUpUser',
        meta: {layout: 'auth',authRequired:false},
        component: SignUpUser
    }
];
