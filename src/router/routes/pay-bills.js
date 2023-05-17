import PayBills from "../../views/paybills/PayBills";
import Documentation from "../../views/dashboard/Documentation";


export default [

    {
        path: '/bills-payment/',
        component: PayBills,
        name: 'PayBills',
        meta: {layout: 'dashboard',authRequired:false},
    },
    {
        path: '/bills-payment/coming-soon',
        name: 'Documentation',
        meta: {layout: 'dashboard',authRequired:true},
        component: Documentation,
    },

];