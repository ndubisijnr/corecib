// const url =  '/kyc/coming-soon'

export default
{
    header: 'Services',
    icon: '',
    items: [
        {
            name:'Dispute',
            icon:'fas fa-sort',
            path:'/reports/dispute',
            // children:[
            //     {
            //         header: 'Bills Payment',
            //         icon: '',
            //         items: [
            //             {
            //                 name:'Pay Bills',
            //                 icon:'fas fa-money-bill-wave-alt',
            //                 path:'/'
            //             },
            //
            //         ]
            //     }
            // ]
        },
        {
            name:'Account Activities',
            icon:'fa fa-money-bill',
            path:'/reports/transactions'
        },
        {
            name:'Transactions',
            icon:'fa fa-money-bill',
            path:'/organisation/transactions'
        },

        // {
        //     name:'Payout',
        //     icon:'fas fa-chart-line',
        //     path:'/reports/payout-transactions'
        // },

        {
            name:'Virtual Accounts',
            icon:'fa fa-university',
            path:'/account'
        },
        {
            name:'Wallet',
            icon:'fa fa-wallet',
            path:'/wallet'
        },
        {
            name:'Saving Account',
            icon:'fa fa-wallet',
            path:'/open-account'
        },
        {
            name:'KYC Verification',
            icon:'fas fa-check-circle',
            path:'/kyc-verifications'
            // path:url
        },
        {
            name:'Fund Transfer',
            icon:'fas fa-check-circle',
            path:'/fund-transfer'
        },


       ]

};