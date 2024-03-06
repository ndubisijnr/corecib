export default
{
    header: 'Wallet Activities',
    icon: '',
    items: [
        // {
        //     name:'API Logs',
        //     icon:'ni ni-support-16 text-primary',
        //     path:'/reports/logs'
        // },
        // {
        //     name:'Dispute',
        //     icon:'fas fa-sort',
        //     path:'/reports/dispute',
        //     // children:[
        //     //     {
        //     //         header: 'Bills Payment',
        //     //         icon: '',
        //     //         items: [
        //     //             {
        //     //                 name:'Pay Bills',
        //     //                 icon:'fas fa-money-bill-wave-alt',
        //     //                 path:'/'
        //     //             },
        //     //
        //     //         ]
        //     //     }
        //     // ]
        // },
        {
            name:'Transactions',
            icon:'fa fa-money-bill',
            path:'/reports/transactions'
        },
        {
            name:'Payout',
            icon:'fas fa-chart-line',
            path:'/reports/payout-transactions'
        },

        {
            name:'Virtual Accounts',
            icon:'fa fa-university',
            path:'/account'
        },
        {
            name:'Wallets',
            icon:'fa fa-wallet',
            path:'/wallet'
        },
        {
            name:'Accounts',
            icon:'fa fa-wallet',
            path:'/account'
        },
        // {
        //     name:'KYC Verification',
        //     icon:'fas fa-check-circle',
        //     path:'/kyc-verifications'
        // },
    ]
};