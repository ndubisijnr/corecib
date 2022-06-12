import PayBills from "../../views/paybills/PayBills";


export default [

    {
        path: '/bills-payment/',
        component: PayBills,
        name: 'PayBills',
        meta: {layout: 'dashboard',authRequired:false},
    },

];