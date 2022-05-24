import GetStarted from '../../views/dashboard/GetStarted'
import NewBusiness from '../../views/auth/NewBusiness'
import Pricing from "@/views/dashboard/Pricing";


export default [
    {
        path: '/dashboard/get-started',
        name: 'GetStarted',
        meta: {layout: 'dashboard',authRequired:true},
        component: GetStarted,
    },


    {
        path: '/dashboard/new-business',
        name: 'NewBusiness',
        meta: {layout: 'dashboard',authRequired:true},
        component: NewBusiness
    },
    {
        path: '/dashboard/pricing',
        name: 'Pricing',
        meta: {layout: 'dashboard',authRequired:true},
        component: Pricing
    },
];