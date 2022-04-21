import VirtualAccount from '../../views/virtualAccount/VirtualAccount'


export default [
    {
        path: '/account',
        component: VirtualAccount,
        name: 'VirtualAccount',
        meta: {layout: 'dashboard',authRequired:true},
    },
];