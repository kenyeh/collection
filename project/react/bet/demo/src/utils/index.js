export const sortBy = (arr, prop, increase=true) => {
  let result = arr.slice();
  if (increase) {
    return result.sort((a, b) => a[prop] < b[prop]);
  }
  return result.sort((a, b) => a[prop] > b[prop]);
}

export const insertToArrAndSortBy = (arr, data, sortName) => {
    arr = arr.concat(data);
    arr = sortBy(arr, sortName);
    return arr;
  }
