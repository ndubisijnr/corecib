import KycView from "../../views/kyc/KycView";
import MakeRequestView from "../../views/kyc/MakeRequestView";


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
    }

]