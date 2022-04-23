import Dispute from '../../views/dispute/Dispute'
import AllTransaction from '../../views/report/Transactions'


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
];