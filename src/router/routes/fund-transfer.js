import FundTransfer from "../../views/fundTransfer/FundTransfer";


export default [

    {
        path: '/fund-transfer',
        component: FundTransfer,
        name: 'FundTransfer',
        meta: {layout: 'dashboard',authRequired:true},
    },

];