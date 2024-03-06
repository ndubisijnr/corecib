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
            name:'Revenue Activities',
            icon:'fa fa-money-bill',
            path:'/reports/transactions'
        },
        {
            name:'Revenue Commission ',
            icon:'fa fa-money-bill',
            path:'/organisation/transactions'
        },

        // {
        //     name:'Payout',
        //     icon:'fas fa-chart-line',
        //     path:'/reports/payout-transactions'
        // },

        // {
        //     name:'Onboarding Task Payers',
        //     icon:'fa fa-university',
        //     path:'/account'
        // },
         {
            name:'Onboarding Task Payers',
            icon:'fa fa-wallet',
            path:'/wallet'
        },
        {
            name:'Renumeration',
            icon:'fa fa-wallet',
            path:'/open-account'
        },
        {
            name:'Assesment',
            icon:'fas fa-check-circle',
            path:'/kyc-verifications'
            // path:url
        },
        // {
        //     name:'Fund Transfer',
        //     icon:'fas fa-check-circle',
        //     path:'/fund-transfer'
        // },


       ]

};