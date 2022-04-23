import Wallet from '../../views/wallet/Wallet'
import WalletTransaction from '../../views/wallet/WalletTransactions'

export default [
    {
        path: '/user/wallet',
        component: Wallet,
        name: 'Wallet',
        meta: {layout: 'dashboard',authRequired:true},
    },
    {
        path: "/user/all-transactions",
        component: WalletTransaction,
        name: 'WalletTransaction',
        meta: {layout: 'dashboard',authRequired:true},

    },
];