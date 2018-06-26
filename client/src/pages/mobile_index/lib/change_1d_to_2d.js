export default function(array, colNum) {
  const n = array.length;
  let newArray = [];
  let counter = 0;
  for (let i = 0; i < n; i += colNum) {
    newArray[counter] = [];
    for (let j = 0; j < colNum && i + j < n; j++) {
      newArray[counter].push(array[i + j]);
    }
    counter++;
  }
  return newArray;
}
