import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import privilages from "./modules/privilages";
import role from "./modules/role";
import branch from "./modules/branch";
import user from "./modules/user";
import internalAccount from "./modules/internalAccount";
import product from "./modules/product";
import customer from "./modules/customer";
import account from "./modules/account";
import bank from "./modules/bank";
import nip from "./modules/nip";
import transfer from "./modules/transfer";
import transaction from "./modules/transaction";
import teller from "./modules/teller";
import till from "./modules/till";
import vault from "./modules/vault";
import glLevel from "./modules/glLevel";
import journal from "./modules/journal";
import report from "./modules/report";
import loan from "./modules/loan";
import checker from "./modules/checker";
import customers from "./modules/customers";
import readApikey from "./modules/readApikey";
import dispute from "./modules/dispute";
import walletransactions from "./modules/walletransactions"
import virtualAccount from "./modules/virtualAccount"


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        privilages,
        role,
        branch,
        user,
        internalAccount,
        product,
        customer,
        account,
        bank,
        nip,
        transfer,
        transaction,
        teller,
        till,
        vault,
        glLevel,
        journal,
        report,
        loan,
        checker,
        customers,
        readApikey,
        dispute,
        walletransactions,
        virtualAccount

    },
    state: {},

    getters: {
        getToken: () => {
            return localStorage.token;
        },
    },
    mutations: {},
    actions: {
        see() {
            //console.log("test");
        }
    },
    // Enable strict mode in development to get a warning
    // when mutating state outside of a mutation.
    // https://vuex.vuejs.org/guide/strict.html
    strict: process.env.NODE_ENV !== "production"
});

export default store;
