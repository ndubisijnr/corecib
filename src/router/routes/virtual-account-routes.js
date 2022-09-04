import VirtualAccount from '../../views/virtualAccount/VirtualAccount'
import VirtualAccountTransaction from '../../views/virtualAccount/VirtualAccountTransactions'

export default [
    {
        path: '/account',
        component: VirtualAccount,
        name: 'VirtualAccount',
        meta: {layout: 'dashboard',authRequired:true},
    },
    {
        path: `/account/virtual-acccount/transactions`,
        component: VirtualAccountTransaction,
        name: 'VirtualAccountTransaction',
        meta: {layout: 'dashboard',authRequired:true},
    },
];


