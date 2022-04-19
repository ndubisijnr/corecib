import Loan from "../../views/loan/Loan";
import LoanSchedule from "../../views/loan/LoanSchedule";
import LoanChart from "../../views/loan/LoanChart";

export default [
    {
        path: '/loans',
        name: 'Loans',
        meta: {layout: 'on-boarding',authRequired:true},
        component: Loan,
    },
    {
        path: '/loans/schedules',
        name: 'LoanSchedule',
        meta: {layout: 'on-boarding',authRequired:true},
        component: LoanSchedule,
    },
    {
        path: '/loans/chart',
        name: 'LoanChart',
        meta: {layout: 'on-boarding',authRequired:true},
        component: LoanChart,
    }
];
