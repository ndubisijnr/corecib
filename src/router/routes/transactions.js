import Transactions from "../../views/transactions/Transactions";

export default [
    {
        path: '/organisation/transactions',
        component: Transactions,
        name: 'Transactions',
        meta: {layout: 'dashboard',authRequired:true},
    },
];