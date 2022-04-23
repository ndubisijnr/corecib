import VirtualAccount from '../../views/virtualAccount/VirtualAccount'


export default [
    {
        path: '/user/account',
        component: VirtualAccount,
        name: 'VirtualAccount',
        meta: {layout: 'dashboard',authRequired:true},
    },
];