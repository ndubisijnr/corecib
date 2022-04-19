import store from "../../store/store";

class StoreUtils {
  static actions = {
    loader: {
      showBlockingLoader: "loader/showBlockingLoader",
      showNonBlockingLoader: "loader/showNonBlockingLoader",
      showTableLoader: "loader/showTableLoader",
      showComponentLoader: "loader/showComponentLoader"
    },
    notification: {
      addNotificationSlide: "notification/addNotificationSlide",
      removeNotificationSlide: "notification/removeNotificationSlide",
      showNotificationModal: "notification/showNotificationModal",
      closeNotificationModal: "notification/closeNotificationModal",
      showTransactionalNotificationModal:
        "notification/showTransactionalNotificationModal",
      closeTransactionalNotificationModal:
        "notification/closeTransactionalNotificationModal"
    },
    router: {
      SET_ACTIVE_ROUTE: "router/setActiveRoute",
      SET_PAGE_TITLE: "router/setPageTitle",
      CLOSE_APP: "router/closeApp"
    },
    auth: {
      LOGOUT: "auth/logOut"
    },
    appUtilities: {
      FETCH_ALL_TRANSACTION_CODE: "appUtilities/fetchAllTransactionCode",
      FETCH_ALL_CHARGE_PRODUCTS: "appUtilities/fetchAllChargeProducts",
      FETCH_BANK_LIST: "appUtilities/fetchBankList",
      FETCH_ALL_FUNDS_TRANSFER_PRODUCT:
        "appUtilities/fetchAllFundsTransferProduct"
    },
    accountingEntry: {
      CREATE: "accountingEntry/create",
      SET_CURRENT_ACCOUNTING_ENTRY: "accountingEntry/setCurrentAccountingEntry",
      ASSIGN_ENTRIES: "accountingEntry/assignEntries",
      SET_ACCOUNTING_ENTRIES: "accountingEntry/setAccountingEntries",
      FETCH_ALL: "accountingEntry/fetchAccountingEntries",
      SET_CURRENT_ACCOUNTING_ENTRY_ENTRIES:
        "accountingEntry/setCurrentAccountingEntryEntries",
      FETCH_ONE: "accountingEntry/fetchCurrentAccountingEntryEntries",
      FETCH_ACCOUNTING_ENTRY_ENTRIES:
        "accountingEntry/fetchCurrentAccountingEntryEntries",
      DELETE: "accountingEntry/delete",
      REMOVE_ACCOUNTING_ENTRY: "accountingEntry/removeAccountingEntry",
      ADD_ENTRY_TO_CURRENT: "accountingEntry/addEntryToCurrent",
      REMOVE_ENTRY_FROM_CURRENT: "accountingEntry/removeEntryFromCurrent",
      RESET_NEXT_ID: "accountingEntry/resetNextId"
    },
    journal: {
      OPEN_BATCH: "journal/openBatch",
      ADD_ENTRY_TO_BATCH: "journal/addEntryToBatch",
      CLOSE_BATCH: "journal/closeBatch",
      FETCH_ALL_BATCHES: "journal/fetchAllBatches",
      SET_CURRENT_BATCH: "journal/setCurrentBatch",
      SET_CURRENT_BATCH_REFERENCE: "journal/setCurrentBatchReference",
      FETCH_CURRENT_BATCH_ENTRIES: "journal/fetchCurrentBatchEntries",
      DELETE_BATCH: "journal/deleteBatch",
      DELETE_ENTRY_FROM_CURRENT_BATCH: "journal/deleteEntryFromCurrentBatch",
      SET_ALL_JOURNALS_CHECKERS_QUEUE: "journal/setAllJournalsCheckersQueue"
    },
    switchTransaction: {
      FETCH_DECISION_BOX: "switchTransaction/fetchDecisionBox",
      FETCH_ALL_NIP_INWARDS: "switchTransaction/fetchNipInwards",
      FETCH_ALL_NIP_OUTWARDS: "switchTransaction/fetchNipOutwards"
    },
    eod: {
      FETCH_ALL_EOD: "eod/fetchAllEod",
      RUN_EOD: "eod/runEod",
      SET_CURRENT_EOD: "eod/setCurrentEod",
      FETCH_ONE_EOD: "eod/fetchOneEod"
    },
    eom: {
      FETCH_ALL_EOM: "eom/fetchAllEom",
      RUN_EOM: "eom/runEom",
      SET_CURRENT_EOM: "eom/setCurrentEom",
      FETCH_ONE_EOM: "eom/fetchOneEom"
    },
    ft: {
      MANUAL_REVERSAL: "ft/manualReversal",
      CUSTOMER_ACCOUNT_ENQUIRY: "ft/customerAccountEnquiry",
      BALANCE_ENQUIRY_INTERNAL: "ft/balanceEnquiryInternal",
      NAME_ENQUIRY_INTERNAL: "ft/nameEnquiryInternal",
      NAME_ENQUIRY_EXTERNAL: "ft/nameEnquiryExternal",
      FUND_TRANSFER_EXTERNAL: "ft/fundTransferExternal",
      FUND_TRANSFER_INTERNAL: "ft/fundTransferInternal",
      CASH_WITHDRAWAL: "ft/cashWithdrawal",
      CASH_DEPOSIT: "ft/cashDeposit",
      GO_BACK_TO_STAGE_ONE: "ft/goBackToStageOne",
      GO_BACK_TO_STAGE_TWO: "ft/goBackToStageTwo",
      RESET: "ft/resetState"
    },
    loan: {
      VIEW_LOAN_SCHEDULE: "loan/viewLoanSchedule",
      FETCH_CURRENT_LOAN_SCHEDULE: "loan/fetchCurrentLoanSchedule"
    },
    rptUtilities: {
      FETCH_REPORT_BASE_TABLE_COLUMNS:
        "rptUtilities/fetchReportBaseTableColumns",
      FETCH_REPORT_CAP_TABLE_COLUMNS: "rptUtilities/fetchReportCapTableColumns",
      FETCH_TABLE_LIST: "rptUtilities/fetchTableList",
      FETCH_REPORT_LIST: "rptUtilities/fetchReportList",
      FETCH_REPORT_CATEGORIES: "rptUtilities/fetchReportCategories",
      GET_AND_OR_OPTIONS: "rptUtilities/getAndOrOptions",
      GET_OPERATOR_OPTIONS: "rptUtilities/getOperatorOptions"
    },
    rpt: {
      GO_BACK_TO_STAGE: "rpt/goBackToStage",
      BUILD_CREATE_REPORT_REQUEST_BODY: "rpt/buildCreateReportRequestBody",
      BUILD_QUERY_REPORT_REQUEST_BODY: "rpt/buildQueryReportRequestBody",
      FETCH_ALL_REPORTS: "rpt/fetchAllReports"
    }
  };

  static mutations = {
    form: {
      RESET_FORM: "form/RESET_FORM",
      BUILD_FORM_BODY: "form/BUILD_FORM_BODY",
      INCREASE_FORM_STAGE_BY_ONE: "form/INCREASE_FORM_STAGE_BY_ONE"
    },
    table: {
      SET_TABLE_DATA: "table/SET_TABLE_DATA",
      SET_ALT_TABLE_DATA: "table/SET_ALT_TABLE_DATA",
      SET_CURRENT_TABLE_OBJECT: "table/SET_CURRENT_TABLE_OBJECT"
    }
  };
  static getters = {
    form: {
      GET_FORM_BODY: "form/getFormBody"
    },
    table: {
      GET_TABLE_DATA: "table/getTableData",
      GET_ALT_TABLE_DATA: "table/getAltTableData",
      GET_CURRENT_TABLE_OBJECT: "table/getCurrentTableObject"
    },
    router: {
      GET_PAGE_TITLE: "router/getPageTitle"
    },
    user: {
      GET_USER_BANK_CODE: "user/getUserBankCode",
      GET_USER_BRANCH_CODE: "user/getUserBranchCode",
      GET_USER_ID: "user/getUserId",
      GET_USER_TILL_ACCOUNT_NUMBER: "user/getUserTillAccountNumber",
      GET_USER_DEPARTMENT: "user/getUserDepartment",
      GET_USER_TOKEN: "user/getUserTokenFromLocalStorage"
    },
    accountingEntry: {
      GET_CURRENT_ACCOUNTING_ENTRY: "accountingEntry/getCurrentAccountingEntry",
      GET_CURRENT_ACCOUNTING_ENTRY_CODE:
        "accountingEntry/getCurrentAccountingEntryCode",
      GET_ENTRIES_TOTAL: "accountingEntry/getEntriesTotal"
    },
    journal: {
      GET_CURRENT_BATCH: "journal/getCurrentBatch"
    },
    eod: {
      GET_CURRENT_EOD: "eod/getCurrentEod"
    },
    eom: {
      GET_CURRENT_EOM: "eom/getCurrentEom"
    },
    appUtilities: {
      GET_BANK_LIST_UTILITY_OPTION: "appUtilities/getBankListUtilityOption",
      GET_BANK_CODE_FROM_BANK_LIST_OPTION:
        "appUtilities/getBankCodeFromBankListOption",
      GET_BANK_NAME_FROM_CODE_UTILITY: "getBankNameFromCodeUtility",
      GET_LOAN_PRODUCT_TENURE_FROM_OPTION_UTILITY:
        "getLoanProductTenureFromOptionUtility"
    },
    ft: {
      GET_FT_STAGE: "ft/getFtStage",
      GET_FT_STAGE_ONE_RESPONSE: "ft/getFtStageOneResponse",
      GET_FT_STAGE_TWO_RESPONSE: "ft/getFtStageTwoResponse",
      GET_FT_STAGE_THREE_RESPONSE: "ft/getFtStageThreeResponse"
    },
    loan: {
      GET_CURRENT_LOAN: "loan/getCurrentLoan"
    },
    rptUtilities: {
      GET_REPORT_CATEGORIES_OPTION: "rptUtilities/getReportCategoriesOption",
      GET_REPORT_TABLE_TYPES_OPTION: "rptUtilities/getReportTableTypesOption",
      GET_TABLE_LIST_OPTION: "rptUtilities/getTableListOption",
      GET_REPORT_LIST_OPTION: "rptUtilities/getReportListOption",
      GET_REPORT_JOIN_TYPES_OPTION: "rptUtilities/getReportJoinTypesOption",
      GET_REPORT_NAME_FROM_OPTION: "rptUtilities/getReportNameFromOption",
      GET_REPORT_BASE_TABLE_COLUMNS_OPTION:
        "rptUtilities/getReportBaseTableColumnsOption",
      GET_REPORT_CAP_TABLE_COLUMNS_OPTION:
        "rptUtilities/getReportCapTableColumnsOption",
      GET_ALL_REPORT_TABLES_COLUMNS_OPTION:
        "rptUtilities/getAllReportTablesColumnsOption"
    },
    rpt: {
      GET_STAGE: "rpt/getStage",
      GET_REPORT_BASE_TABLE_NAME: "rpt/getReportBaseTableName",
      GET_REPORT_CAP_TABLE_NAME: "rpt/getReportCapTableName",
      GET_REPORT_TYPE: "rpt/getReportType"
    }
  };

  static dispatch(actionToDispatch, payload) {
    return store.dispatch(actionToDispatch, payload, { root: true });
  }

  static commit(mutationToCommit, payload) {
    return store.commit(mutationToCommit, payload, { root: true });
  }

  static rootGetter(getter, payload) {
    if (payload) {
      return store.getters[getter](payload);
    } else {
      return store.getters[getter];
    }
  }

  static rootGetters(getter, payload) {
    if (payload) {
      return store.getters[getter](payload);
    } else {
      return store.getters[getter];
    }
  }
}

export default StoreUtils;
