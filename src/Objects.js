// _.get implementation
/**
 * get(obj, path string, return value if not found)
 */

function get(obj, str, retVal = false) {
  let keys = str.split("."),
    tempObj = obj;

  for (var i = 0; i < keys.length; i++) {
    if (tempObj[keys[i]] === undefined) return retVal;
    else tempObj = tempObj[keys[i]];
  }
  return tempObj;
}
let p = { a: 1, b: [1, 2] };
console.log(get(p, "b.0", false));
console.log(get(p, "b.a", false));
