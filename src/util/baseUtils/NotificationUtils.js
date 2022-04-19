import StoreUtils from "./StoreUtils";

class NotificationUtils {
  static type = {
    ERROR: "error",
    SUCCESS: "success",
    WARNING: "warning"
  };
  static mode = {
    DEFAULT: "default",
    YES: "yes",
    YES_NO: "yes-no"
  };
  static iconTypes = {
    TRANSACTION_SUCCESSFUL: "transaction-successful",
    BALANCE_ENQUIRY: "balance-enquiry"
  };

  static addNotificationSlide(message, notificationType) {
    const notification = {
      type: notificationType,
      message:
        notificationType === NotificationUtils.type.ERROR
          ? `Error - ${message}`
          : message
    };
    StoreUtils.dispatch(
      StoreUtils.actions.notification.addNotificationSlide,
      notification
    );
  }

  static removeNotificationSlide(notification) {
    StoreUtils.dispatch(
      StoreUtils.actions.notification.removeNotificationSlide,
      notification
    );
  }

  static showNotificationModal(notificationModalBody) {
    StoreUtils.dispatch(
      StoreUtils.actions.notification.showNotificationModal,
      notificationModalBody
    );
  }

  static closeNotificationModal() {
    StoreUtils.dispatch(StoreUtils.actions.notification.closeNotificationModal);
  }

  static showTransactionalNotificationModal(
    transactionalNotificationModalBody
  ) {
    StoreUtils.dispatch(
      StoreUtils.actions.notification.showTransactionalNotificationModal,
      transactionalNotificationModalBody
    );
  }

  static closeTransactionalNotificationModal() {
    StoreUtils.dispatch(
      StoreUtils.actions.notification.closeTransactionalNotificationModal
    );
  }
}
export default NotificationUtils;
