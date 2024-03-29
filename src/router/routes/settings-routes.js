import Settings from '../../views/settings/Settings'
import Referral from '../../views/settings/Referral'


export default [

    {
        path: '/settings/settings',
        component: Settings,
        name: 'Settings',
        meta: { layout: 'dashboard', authRequired: true },
    },
    {
        path: `/bizgem/Referral`,
        component: Referral,
        name: 'Referral',
        meta: { layout: 'dashboard', authRequired: true },
    },
];

