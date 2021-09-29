// indexOf 로는 동일 채널 id 일때 문제 발생-->  indexOfAll 함수가 필요함
function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

export { getAllIndexes };
