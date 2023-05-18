import KycView from "../../views/kyc/KycView";
import MakeRequestView from "../../views/kyc/MakeRequestView";
import Documentation from "../../views/dashboard/Documentation";


export default [
    {
        path: '/kyc-verifications',
        component: KycView,
        name: 'KYC Verification',
        meta: {layout: 'dashboard',authRequired:true},
    },
    {
        path: '/kyc-verifications/request-verification',
        component: MakeRequestView,
        name: 'MakeRequestView',
        meta: {layout: 'dashboard',authRequired:true},
    },
    {
        path: '/kyc/coming-soon',
        name: 'Documentation',
        meta: {layout: 'dashboard',authRequired:true},
        component: Documentation,
    },

]