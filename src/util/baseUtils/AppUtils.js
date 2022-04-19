import copy from "copy-to-clipboard";
import Papa from "papaparse";
import StoreUtils from "./StoreUtils";

class AppUtils {
  static urls = {
    auth: {
      LOGIN: "/login"
    }
  };

  static convertCsvToJson(files, doneAction = () => {}) {
    if (!files.length) {
      StoreUtils.dispatch(
        StoreUtils.actions.notification.addNotificationSlide,
        {
          type: "error",
          message: `Please select a file!`
        }
      );
      return { responseCode: "01", responseMessage: `Please select a file` };
    } else {
      let csvFile = files[0];
      if (csvFile.name.includes("csv")) {
        Papa.parse(csvFile, {
          complete: function(results) {
            let csvArrayOfArrays = results.data;
            let arrayOfKeys = csvArrayOfArrays[0];

            let mapArrayToObject = (arrayOfValues, arrayOfKeys) => {
              let resultObject = {};
              arrayOfKeys.forEach(function(value, i) {
                resultObject[value] = arrayOfValues[i];
              });
              return resultObject;
            };

            let csvJson = csvArrayOfArrays
              .map((currentArray, index) => {
                if (index !== 0) {
                  return mapArrayToObject(currentArray, arrayOfKeys);
                }
                return null;
              })
              .filter((element, index) => {
                if (index !== 0) {
                  return element;
                }
              });

            doneAction(csvJson);
          }
        });
        return { responseCode: "00", responseMessage: "Success" };
      } else {
        StoreUtils.dispatch(
          StoreUtils.actions.notification.addNotificationSlide,
          {
            type: "error",
            message: `Please select a CSV file!`
          }
        );
        return {
          responseCode: "01",
          responseMessage: "Please select a CSV file"
        };
      }
    }
  }

  static parameters = {};

  static getDefaultPayload = {
    source: "web"
  };

  static getDeviceId() {
    return "0";
  }

  static getPushId() {
    return "0";
  }

  static copyToClipBoard(textToCopy) {
    copy(textToCopy);

    const notification = {
      type: "success",
      message: `Copied!`
    };
    StoreUtils.dispatch(
      StoreUtils.actions.notification.addNotificationSlide,
      notification
    );
  }

  static getCurrencyColorCode(currency) {
    switch (currency) {
      case "BTC":
        return `#f19617`;
      case "ETH":
        return `#0e367a`;
      case "NGN":
        return `#126152`;
      default:
        return `#505050`;
    }
  }

  static allCountriesArray() {
    return [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antigua &amp; Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bosnia &amp; Herzegovina",
      "Botswana",
      "Brazil",
      "British Virgin Islands",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Cape Verde",
      "Cayman Islands",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Congo",
      "Cook Islands",
      "Costa Rica",
      "Cote D Ivoire",
      "Croatia",
      "Cruise Ship",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Estonia",
      "Ethiopia",
      "Falkland Islands",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      "French Polynesia",
      "French West Indies",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea Bissau",
      "Guyana",
      "Haiti",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kuwait",
      "Kyrgyz Republic",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macau",
      "Macedonia",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Namibia",
      "Nepal",
      "Netherlands",
      "Netherlands Antilles",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Norway",
      "Oman",
      "Pakistan",
      "Palestine",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Reunion",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Pierre &amp; Miquelon",
      "Samoa",
      "San Marino",
      "Satellite",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "South Africa",
      "South Korea",
      "Spain",
      "Sri Lanka",
      "St Kitts &amp; Nevis",
      "St Lucia",
      "St Vincent",
      "St. Lucia",
      "Sudan",
      "Suriname",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Timor L'Este",
      "Togo",
      "Tonga",
      "Trinidad &amp; Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks &amp; Caicos",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "Uruguay",
      "Uzbekistan",
      "Venezuela",
      "Vietnam",
      "Virgin Islands (US)",
      "Yemen",
      "Zambia",
      "Zimbabwe"
    ];
  }
}

export default AppUtils;
