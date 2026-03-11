function getLength(a: string | string[]): number {
  return a.length;
}

/* 이 자리에 함수 정의 */

console.log(getLength("Hello")); // 5
const arr = ["Hello", "World"];
console.log(getLength(arr)); // 2