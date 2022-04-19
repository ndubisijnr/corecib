import StoreUtils from "./StoreUtils";
import router from "../../router/index";

class RouterUtils {
  static routes = {
    queue: {
      GENERAL_CHECKERS_QUEUE: "queue-general-checking-queue"
    },
    dispute: {
      ALL_DISPUTES: "dispute-all-disputes",
      CREATE_DISPUTE: "dispute-create-dispute"
    },
    terminal: {
      OPEN_BATCH: "terminal-open-terminal-batch",
      ADD_ENTRY_TO_BATCH: "terminal-add-entry-to-terminal-batch",
      EDIT_BATCH_ENTRIES: "terminal-edit-terminal-batch-entries",
      ALL_BATCHES: "terminal-all-batches",
      ALL_BATCH_ENTRIES: "terminal-all-batch-entries",
      CHECKERS_QUEUE: "terminal-batch-checkers-queue"
    },
    products: {
      SELECT_PRODUCT_TO_CREATE: "product-select-type-create"
    },
    accountingEntry: {
      CREATE: "accounting-entry-create",
      ASSIGN_ENTRIES: "accounting-entry-assign",
      ALL: "accounting-entry-all"
    },
    customer: {
      ALL_CUSTOMER_ACCOUNTS: "customer-all-customers-accounts",
      CreateCustomerUpload: "customer-create-customer-upload",
      CreateCustomerUploadEdit: "customer-create-customer-upload-edit"
    },
    journal: {
      OPEN_BATCH: "journal-open-batch",
      ADD_ENTRY_TO_BATCH: "journal-add-entry-to-batch",
      EDIT_BATCH_ENTRIES: "journal-edit-batch-entries",
      ALL_BATCHES: "journal-all-entries",
      ALL_BATCH_ENTRIES: "journal-all-batch-entries"
    },
    eod: {
      ALL_EOD: "eod-all-eod",
      EOD_ITEMS: "all-eod-items"
    },
    eom: {
      ALL_EOM: "eom-all-eom",
      EOM_ITEMS: "all-eom-items"
    },
    loan: {
      ALL_LOANS: "loan-view-loans",
      LOAN_AMORTIZATION_SCHEDULE: "loan-amortization-schedule"
    },
    rpt: {
      CREATE_REPORT: "create-report-view",
      VIEW_ALL_REPORTS: "report-view-reports",
      VIEW_REPORT: "report-single-report",
      QUERY_REPORT: "report-query-report"
    },
    role: {
      ALL_ROLES: "role-all-role",
      EDIT_ROLE_PRIVILEGE: "role-edit-role"
    }
  };

  static pageTitles = {
    DEFAULT: "Ruby Loan",
    accountingEntry: {
      CREATE: "Assign Entries",
      EDIT: "Edit Entries"
    }
  };
  static changeRouteTo(targetRoute) {
    router.push({
      name: targetRoute
    });
  }
  static changePageTitleTo(pageTitle) {
    StoreUtils.dispatch(StoreUtils.actions.router.SET_PAGE_TITLE, pageTitle);
  }
  static changeBaseRouteTo(targetRoute) {
    StoreUtils.dispatch(StoreUtils.actions.router.setActiveRoute, targetRoute);
    router.push({
      name: targetRoute
    });
  }

  static changeInnerRouteTo(targetRoute) {
    router.push({
      name: targetRoute
    });
  }
}
export default RouterUtils;
