const obj = {
    [Symbol.toStringTag]: 'myObj',
    name: 'tree'
}

//console.log(Object.prototype.toString.call(obj))
console.log(Object.prototype.toString(obj))