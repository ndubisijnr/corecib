import GetStarted from '../../views/dashboard/GetStarted'
import NewBusiness from '../../views/auth/NewBusiness'


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
];