import StoreUtils from "./StoreUtils";

class LoaderUtils {
  static types = {
    BLOCKING: "loader/showBlockingLoader",
    NONBLOCKING: "loader/showNonBlockingLoader",
    TABLE: "loader/showTableLoader",
    COMPONENT: "loader/showComponentLoader",
    ACTION_BUTTON: "loader/showActionButtonLoader",
    TABLE_ACTION_BUTTON: "loader/showTableActionButtonLoader",
    UPLOAD: "loader/showUploadLoader",
    NONE: "none"
  };

  static showLoading(status, loaderType) {
    if (loaderType !== this.types.NONE) {
      StoreUtils.dispatch(loaderType, status);
    }
  }
}

export default LoaderUtils;
