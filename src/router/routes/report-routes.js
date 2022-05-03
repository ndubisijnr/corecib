import Dispute from '../../views/dispute/Dispute'
import AllTransaction from '../../views/report/Transactions' 
import PayoutTransaction from '../../views/report/PayoutTransactions'


export default [
   
    {
        path: '/reports/dispute',
        component: Dispute,
        name: 'Dispute',
        meta: {layout: 'dashboard',authRequired:true},
    },
    {
        path: '/reports/transactions',
        component: AllTransaction,
        name: 'AllTransaction',
        meta: {layout: 'dashboard',authRequired:true},
    },
    {
        path: '/reports/payout-transactions',
        component: PayoutTransaction,
        name: 'PayoutTransaction',
        meta: {layout: 'dashboard',authRequired:true},
    },
];