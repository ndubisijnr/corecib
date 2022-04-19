import AccountingRule from "@/views/rule/AccountingRule";
import NewAccountingRule from "@/views/rule/NewAccountingRule";

export default [
    {
        path: '/accounting-rules',
        name: 'AccountingRule',
        meta: {layout: 'on-boarding',authRequired:true},
        component: AccountingRule,
    },
    {
        path: '/create-accounting-rule',
        name: 'CreateAccountingRule',
        meta: {layout: 'on-boarding',authRequired:true},
        component: NewAccountingRule,
    },
];
