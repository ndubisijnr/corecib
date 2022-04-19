class NetworkUtils {
  static endpoints = {
    queue: {
      FETCH_GENERAL_CHECKERS_QUEUE: "/readCheckerQueue",
      AUTHORIZE_GENERAL_CHECKERS_QUEUE_ITEM: "/authorizeCheckerQueue"
    },
    utilities: {
      FETCH_CUSTOMER_ACCOUNTS_BY_CUSTOMER_ID: "/queryRecentTransaction",
      FETCH_BUSINESS_TYPES: "/businessTypes"
    },
    dispute: {
      UPDATE_DISPUTE_STATUS: "/updateStatusDispute",
      UPDATE_DISPUTE: "/updateDispute",
      CREATE_DISPUTE: "/createDispute",
      FETCH_ALL_DISPUTES: "/readDisputes",
      FETCH_ONE_DISPUTE: "/readSingleDispute",
      REOPEN_DISPUTE: "/reOpenDispute"
    },
    terminal: {
      ASSIGN_TERMINAL_TO_CUSTOMER_ACCOUNT: "/createTerminal",
      FETCH_ALL_ASSIGNED_TERMINALS: "/readTerminals",
      REASSIGN_TERMINAL: "/recreateTerminal",
      RESET_TERMINAL_PIN: "/resetTerminal",
      OPEN_TERMINAL_BATCH: "/terminalBatchCreate",
      ADD_ENTRY_TO_BATCH: "/submitTerminalBatchEntry",
      BULK_ENTRY_TO_BATCH: "/submitTerminalBulkBatchEntry",
      CLOSE_TERMINAL_BATCH: "/terminalBatchClose",
      FETCH_ALL_TERMINAL_BATCH: "/terminalBatchRead",
      FETCH_ONE_TERMINAL_BATCH: "/terminalBatchReadSingle",
      DELETE_TERMINAL_BATCH: "/updateTerminalBatchStatus",
      FETCH_ALL_BATCH_CHECKERS_QUEUE: "/terminalBatchChecker",
      AUTHORIZE_BATCH_CHECKER: "/terminalBatchChecker"
    },
    investment: {
      CREATE_FIXED_DEPOSIT: "/createInvestment",
      FETCH_ALL_FIXED_DEPOSITS: "/readInvestments",
      TOP_UP_FIXED_DEPOSIT: "/topUpInvestment",
      LIQUIDATE_FIXED_DEPOSIT: "/liquidateInvestment"
    },
    accountingEntry: {
      FETCH_SLAB_ENTRIES: "/readSingleSlab",
      FETCH_SLABS: "/readSlabs",
      CREATE: "/createAccountingEntry",
      ASSIGN_ENTRIES: "/submitEntries",
      FETCH_ALL: "/readAccountingEntry",
      FETCH_ONE: "/readSingleAccountingEntry",
      DELETE: "/deleteAccountingEntry"
    },
    journal: {
      QUERY_TRANSACTION_HISTORY: "/queryRecentTransaction",
      OPEN_BATCH: "/batchCreate",
      ADD_ENTRY_TO_BATCH: "/submitBatchEntry",
      BULK_ENTRY_TO_BATCH: "/submitBulkBatchEntry",
      CLOSE_BATCH: "/batchClose",
      FETCH_ALL: "/batchRead",
      FETCH_ONE: "/batchReadSingle",
      DELETE_BATCH: "/updateBatchStatus",
      DELETE_BATCH_ENTRY: "/updateBatchEntryStatus",
      FETCH_ALL_BATCH_CHECKERS_QUEUE: "/batchChecker",
      AUTHORIZE_BATCH_CHECKER: "/batchChecker",
    },
    switchTransaction: {
      FETCH_ALL_NIP_INWARDS: "/nipInwards"
    },
    eod: {
      FETCH_ALL_EOD: "/eodRead",
      RUN_EOD: "/eodCreate",
      FETCH_ONE_EOD: "/eodReadSingle"
    },
    eom: {
      FETCH_ALL_EOM: "/eomRead",
      RUN_EOM: "/eomCreate",
      FETCH_ONE_EOM: "/eomReadSingle"
    },
    bank: {
      FETCH_BANK_LIST: "/bankList"
    },
    ft: {
      BALANCE_ENQUIRY_INTERNAL: "/balanceEnquiry",
      NAME_ENQUIRY_INTERNAL: "/nameEnquiryForAll",
      NAME_ENQUIRY_EXTERNAL: "/nameEnquiryForAll",
      EXTERNAL_FUND_TRANSFER: "/fundTransferOutward",
      INTERNAL_FUND_TRANSFER: "/fundTransfer",
      CASH_WITHDRAWAL: "/cashWithdrawal",
      CASH_DEPOSIT: "/cashDeposit",
      MANUAL_REVERSAL: "/reverseTransaction"
    },
    loan: {
      VIEW_LOAN_SCHEDULE: "/loanAmortization"
    },
    product: {
      READ_PRODUCT_FORM: "/readProductForm"
    },
    rpt: {
      CREATE_REPORT: "/reportCreate",
      FETCH_ALL_REPORTS: "/reportRead",
      FETCH_A_REPORT: "/reportReadSingle",
      FETCH_DEPARTMENTS: "/readDepartments",
      FETCH_REPORT_LIST: "/reportRead",
      FETCH_TABLE_LIST: "/readTables",
      FETCH_TABLE_COLUMNS: "/reportReadColumn",
      REQUEST_ACCOUNT_STATEMENT: "/requestStatement"
    },
    customer: {
      CLOSE_CUSTOMER_ACCOUNT: "/accountUpdateStatus",
      LIQUIDATE_ACCOUNT_ACCRUALS: "/liquidateAccruals",
      FETCH_ACCOUNT_ACCRUALS: "/readAccruals",
      DELETE_CUSTOMER_ACCOUNT_DOCUMENT: "/documentDelete",
      APPROVE_CUSTOMER_ACCOUNT_DOCUMENT: "/documentAuthorize",
      UPLOAD_CUSTOMER_ACCOUNT_DOCUMENT: "/documentCreate",
      FETCH_CUSTOMER_ACCOUNT_DOCUMENTS: "/documentReadByCustomer",
      CREATE_CUSTOMER_ACCOUNT: "/customerCreate",
      EDIT_CUSTOMER_INFO: "/customerUpdate",
      EDIT_CUSTOMER_ACCOUNT: "/accountUpdate",
      FETCH_CUSTOMER_INFO_BY_ACCOUNT_NUMBER: "/accountReadSingle",
      SEARCH_CUSTOMERS: "/customerRead",
      SEARCH_CUSTOMER_ACCOUNT: "/accountRead",
      UPLOAD_CUSTOMERS: "/uploadCustomers"
    },
    role: {
      FETCH_ALL_ROLES: "/roleRead",
      FETCH_ONE_ROLE: "/roleReadSingle",
      EDIT_ROLE_PRIVILEGES: "/userRolePrivilegeCreate"
    },
    cashTransaction: {
      FETCH_TELLER_TRANSACTION_HISTORY: "/tellerTransactions",
      FETCH_ALL_TRANSACTION_HISTORY: "/transactionEnquiry",
      FETCH_CUSTOMER_TRANSACTIONS: "/customerTransactions"
    },
    bankUser: {
      EDIT_USER: "/userUpdate",
      RESET_USER_PASSWORD: "/resetUser"
    }
  };
}

export default NetworkUtils;
