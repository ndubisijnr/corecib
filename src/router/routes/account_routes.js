import Account from "../../views/Account/Account";



export default [
    {
        path: '/open-account',
        name: 'Account',
        meta: {layout: 'dashboard',authRequired:true},
        component: Account,
    },


];