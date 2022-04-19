import { format, differenceInYears } from "date-fns";

class DateFormatterUtils {
  static calculateDifferenceInYears(date) {
    return differenceInYears(new Date(), new Date(date));
  }
  static formatDate(date, dateFormat) {
    return format(new Date(date), dateFormat);
  }
}
export default DateFormatterUtils;
