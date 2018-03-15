/* eslint-disable */
String.prototype.toCamelCaseVar = function () {
  let newString = this.replace(this[0], function(s){return s.toUpperCase();})
  return newString.replace(/\_+[a-zA-Z]/g,
    (str,index) => str.substr(-1).toUpperCase()
  )
}
