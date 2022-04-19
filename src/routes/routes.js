import DashboardLayout from '@/views/layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';
// GeneralViews
import NotFound from '@/views/GeneralViews/NotFoundPage.vue';

//User Management
const User = () =>
  import ( /* webpackChunkName: "dashboard" */ '@/views/user/User');

const Transactions = () =>
  import ('@/views/user/Transactions');

const VirtualAccount = () =>
  import ('@/views/user/VirtualAccount');

const WalletTransaction = () => {
    import ('@/views/user/WalletTransactions');

}

const Wallet = () =>
  import ('@/views/user/Wallet');

//Dispute
const Disputes = () => 
    import ('@/views/user/Dispute');

//Api Logs
const ApiLogs = () => 
    import ('@/views/user/ApiLogs');

//New Business
const NewBusiness = () => 
    import ( /* webpackChunkName: "dashboard" */ '@/views/auth/NewBusiness');

// Dashboard pages
const AlternativeDashboard = () =>
    import ( /* webpackChunkName: "dashboard" */ '@/views/Dashboard/AlternativeDashboard.vue');
const GetStarted = () =>
    import ( /* webpackChunkName: "dashboard" */ '@/views/Dashboard/GetStarted.vue');

const Compliance = () =>
    import ( /* webpackChunkName: "dashboard" */ '@/views/Dashboard/compliance.vue');

//Auth
const Login = () =>
    import ( /* webpackChunkName: "pages" */ '@/views/auth/Login.vue');
const SignUp = () =>
    import ( /* webpackChunkName: "pages" */ '@/views/auth/SignUp.vue');
const ForgotPassword = () =>
    import ( /* webpackChunkName: "pages" */ '@/views/auth/ForgotPassword.vue');

//settings
const Settings = () =>
    import ( /* webpackChunkName: "pages" */ '@/views/settings/settings.vue');


let id;


const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },

  {
    path: '/user/user',
    name: 'User',
    component: User
  },
    {
        path: '/password-reset',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/dashboard',
        component: DashboardLayout,
        //redirect: '/dashboard',
        meta: { requiresAuth: true },
        name: 'Dashboard layout',
        children: [{
                path: '/get-started',
                name: 'GetStarted',
                component: GetStarted,
                meta: {
                    navbarType: 'light'
                }
            },

            {
                path: '/dashboard',
                name: 'Dashboard',
                component: AlternativeDashboard,
                meta: {
                    navbarType: 'light'
                }
            },
            {
                path: '/compliance',
                name: 'Compliance',
                component: Compliance,
                meta: {
                    navbarType: 'light'
                }
            },


        ]
    },
    {
        path: '/new-business',
        component: DashboardLayout,
        name: 'NewBusiness',
        meta: { requiresAuth: true },
        // redirect: '/#/new-business',
        children: [

            {
                path: '/new-business',
                name: 'NewBusiness',
                component: NewBusiness
            },

        ]
    },

    {
        path: '/product',
        component: DashboardLayout,
        name: 'Product',
        meta: { requiresAuth: true },
        redirect: '/product/product',
        children: [
            {
                path: '/new-business',
                name: 'NewBusiness',
                component: NewBusiness
            },

        ]
    },

    {
        path: '/dispute',
        component: DashboardLayout,
        name: 'Dispute',
        meta: { requiresAuth: true },
        redirect: '/dispute/dispute',
        children: [{
                path: 'dispute',
                name: 'Dispute',
                component: Disputes
            },

        ]
    },

    {
        path: '/logs',
        component: DashboardLayout,
        name: 'ApiLogs',
        meta: { requiresAuth: true },
        redirect: '/logs/logs',
        children: [{
                path: 'logs',
                name: 'ApiLogs',
                component: ApiLogs
            },

        ]
    },
    {
        path: '/transactions',
        component: DashboardLayout,
        name: 'Transaction',
        meta: { requiresAuth: true },
        redirect: '/transactions/all',
        children: [{
                path: 'all',
                name: 'AllTransactions',
                component: Transactions
            },

        ]
    },
    {
        path: '/wallet',
        component: DashboardLayout,
        name: 'Wallet',
        meta: { requiresAuth: true },
        redirect: '/wallet/all',
        children: [{
                path: 'all',
                name: 'Wallet',
                component: Wallet
            },

        ]
    },


    
    {
        path: '/account',
        component: DashboardLayout,
        name: 'VirtualAccount',
        meta: { requiresAuth: true },
        redirect: '/account/all',
        children: [{
                path: 'all',
                name: 'VirtualAccount',
                component: VirtualAccount
            },

        ]
    },

    {
        path: "/all-transactions",
        component: DashboardLayout,
        name: 'WalletTransaction',
        meta: { requiresAuth: true },
        // redirect:"/all-transactions/all",
        children: [{
                path: "all",
                name: 'WalletTransaction',
                component: WalletTransaction
            },

        ]
    },


    // {
    //     path: '/transaction',
    //     component: DashboardLayout,
    //     name: 'Transaction',
    //     meta: { requiresAuth: true },
    //     redirect: '/transaction/all',
    //     children: [{
    //             path: 'all',
    //             name: 'AllTransaction',
    //             component: Transaction
    //         },

    //     ]
    // },
    {
        path: '/settings',
        component: DashboardLayout,
        name: 'Settings',
        meta: { requiresAuth: true },
        redirect: '/settings/settings',
        children: [{
                path: 'settings',
                name: 'settings',
                component: Settings
            },

        ]
    },
    // {
    //     path: '/customer',
    //     component: DashboardLayout,
    //     name: 'Customer',
    //     meta: { requiresAuth: true },
    //     redirect: '/customer/all',
    //     children: [{
    //             path: 'all',
    //             name: 'AllCustomer',
    //             component: Customer
    //         },
    //         {
    //             path: 'edit',
    //             name: 'EditCustomer',
    //             component: EditCustomer
    //         },
    //         {
    //             path: 'sub-accounts',
    //             name: 'SubAccounts',
    //             component: SubAccounts
    //         },
    //         {
    //             path: 'transaction-split',
    //             name: 'TransactionSplit',
    //             component: TransactionSplit
    //         },
    //         {
    //             path: 'payout',
    //             name: 'Payout',
    //             component: Payout
    //         },
    //         {
    //             path: 'dispute',
    //             name: 'Dispute',
    //             component: Dispute
    //         },
    //     ]
    // },
   

];


export default routes;
