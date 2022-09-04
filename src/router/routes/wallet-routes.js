import Wallet from '../../views/wallet/Wallet'
import WalletTransaction from '../../views/wallet/WalletTransactions'
export default [
    {
        path: '/wallet',
        component: Wallet,
        name: 'Wallet',
        meta: {layout: 'dashboard',authRequired:true},
    },
    {
        path: "/wallet/all-transactions",
        component: WalletTransaction,
        name: 'WalletTransaction',
        meta: {layout: 'dashboard',authRequired:true},

    },
];