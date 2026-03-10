function makeTuple(number1: number, number2: number): [number, number] {
  if (number1 > number2) {
    return [number2, number1];
  } else {
    return [number1, number2];
  }
}
/* makeTuple 함수 정의 */
const result = makeTuple(3, 2);
console.log(result);