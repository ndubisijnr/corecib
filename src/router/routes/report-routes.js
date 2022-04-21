import Dispute from '../../views/dispute/Dispute'


export default [
    {
        path: 'api/logs',
        component: ApiLogs,
        name: 'ApiLogs',
        meta: {layout: 'dashboard',authRequired:true},
    },


    {
        path: '/dispute',
        component: Dispute,
        name: 'Dispute',
        meta: {layout: 'dashboard',authRequired:true},
    },
];