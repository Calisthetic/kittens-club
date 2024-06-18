export default function groupBy(array:any[], key:any) {
  return array.reduce((result, currentValue) => {
    const keyName = currentValue[key];
    if (!result[keyName]) {
        result[keyName] = [];
    }
    result[keyName].push(currentValue);
    return result;
  }, {});
}