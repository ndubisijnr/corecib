class Utils {
  static objIsEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  static loopThroughAnObject(obj) {
    obj[Symbol.iterator] = function() {
      return {
        entries: Object.entries(this),
        i: 0,
        next() {
          if (this.i >= this.entries.length) {
            return { done: true, value: undefined };
          }
          return {
            done: false,
            value: {
              [this.entries[this.i][0]]: this.entries[this.i++][1]
            }
          };
        }
      };
    };
  }
  static generateNineRandomNumbers() {
    return Math.floor(100000000 + Math.random() * 900000000);
  }

  static generateUUIDRef() {
    let d = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}
export default Utils;
