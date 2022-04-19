class JsonParserUtils {
  static objIsEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  static isObjEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  static purifyObject(object, replaceValue) {
    function replaceNull(object, replaceValue = "***") {
      const replacer = (key, value) =>
        String(value) === "null" || String(value) === "undefined"
          ? replaceValue
          : value;
      //^ because you seem to want to replace (strings) "null" or "undefined" too

      return JSON.parse(JSON.stringify(object, replacer));
    }

    return replaceNull(object, replaceValue);
  }
}
export default JsonParserUtils;
