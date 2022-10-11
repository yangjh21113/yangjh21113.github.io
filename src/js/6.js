const arr = [
  {
    index: 0,
    length: 3,
  },
  {
    index: 5,
    length: 2,
  },
  {
    index: 3,
    length: 10,
  },
];
const arr2 = arr.map((item) => item.length);

//const total = arr.map((item) => item.length).reduce((pre, next) => pre + next);
//const tatal2 = arr.reduce((prev, next) => prev + next.length, 0)
//console.log(total,tatal2)

Array.prototype.myreduce = function myreduce(cb, initValue) {
  const curArray = this;
  if (!curArray.length) {
    return initValue;
  }
  let initPre = initValue;
  let startIndex = 0;

  if (initValue === undefined) {
    initPre = curArray[0];
    startIndex = 1;
  }

  let res = initPre;
  for (let i = startIndex; i < curArray.length; i++) {
    res = cb(res, curArray[i]);
  }
  return res;
};

const total = [1, 2, 3].myreduce((prev, next) => prev + next, 0);
const total2 = [1, 2, 3].myreduce((prev, next) => prev + next, 2);

const arr3 = [{ length: 1 }, { length: 2 }, { length: 3 }];
const total3 = arr3.myreduce((prev, next) => prev + next.length, 2);

console.log(total, total2, total3);
