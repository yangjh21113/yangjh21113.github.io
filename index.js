const res = JSON.stringify(new Function('return' + `{ "id": 10393, name: 'zhangxinxu', 'date': '2022-04-30' }`)())
console.log(res)

