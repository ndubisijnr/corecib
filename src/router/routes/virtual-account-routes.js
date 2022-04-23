import VirtualAccount from '../../views/virtualAccount/VirtualAccount'
import VirtualAccountTransaction from '../../views/virtualAccount/VirtualAccountTransactions'

let payload;
export default [
    {
        path: '/user/account',
        component: VirtualAccount,
        name: 'VirtualAccount',
        meta: {layout: 'dashboard',authRequired:true},
    },
    {
        path: `/user/virtual-acccount/transactions`,
        component: VirtualAccountTransaction,
        name: 'VirtualAccountTransaction',
        meta: {layout: 'dashboard',authRequired:true},
    },
];


