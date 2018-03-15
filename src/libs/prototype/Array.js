/* eslint-disable */
Array.prototype.chunk = function (num) {
  var result = [];
  for(let i = 0, len = this.length; i < len; i += num){
    result.push(this.slice(i, i + num));
  }
  return result
}
