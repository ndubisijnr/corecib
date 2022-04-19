import Transaction from "@/views/amlScreening/Transaction";
import Gateway from "@/views/transaction/Gateway";
import TransactionRule from "@/views/amlScreening/TransactionRule";
import BanksOrphans from "@/views/reconciliation/BanksOrphans";
import MtoOrphans from "@/views/reconciliation/MtoOrphans";
import InboundTransaction from "@/views/transaction/DirectCreditTransaction";
import OutboundTransaction from "@/views/transaction/CashPickTransaction";
import AccountBalance from "@/views/transaction/AccountBalance";

export default [
    {
        path: '/transactions',
        name: 'Transaction',
        meta: {layout: 'on-boarding',authRequired:true},
        component: Transaction,
    },
    {
        path: '/gateway',
        name: 'Gateway',
        meta: {layout: 'on-boarding',authRequired:true},
        component: Gateway,
    },
    {
        path: '/account-balances',
        name: 'AccountBalances',
        meta: {layout: 'on-boarding',authRequired:true},
        component: AccountBalance,
    },
    {
        path: '/bank-orphans',
        name: 'BanksOrphans',
        meta: {layout: 'on-boarding',authRequired:true},
        component: BanksOrphans,
    },
    {
        path: '/mto-orphans',
        name: 'MtoOrphans',
        meta: {layout: 'on-boarding',authRequired:true},
        component: MtoOrphans,
    },
    {
        path: '/inbound-transactions',
        name: 'InboundTransaction',
        meta: {layout: 'on-boarding',authRequired:true},
        component: InboundTransaction,
    },
    {
        path: '/outbound-transactions',
        name: 'OutboundTransaction',
        meta: {layout: 'on-boarding',authRequired:true},
        component: OutboundTransaction,
    },
    {
        path: '/transaction-rule',
        name: 'TransactionRule',
        meta: {layout: 'on-boarding',authRequired:true},
        component: TransactionRule,
    },
];
