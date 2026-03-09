const array:string[] = ["Hello", "World", "Good", "Days"];
const array2:number[] = array.map((i:string):number => { // i는 string 타입, 반환값은 number 타입
  return i.length;
});
