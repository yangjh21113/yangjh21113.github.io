//const { checkArrayHasMin } = require('../src/js/4')
import { checkArrayHasMin } from '../src/js/4'
//function checkArrayHasMin(arr1, arr2) {
//	let min = [Math.min(...arr1), Math.min(...arr2)]
//	let max = [Math.max(...arr1), Math.max(...arr2)]
//	return Math.max(...min) <= Math.min(...max)
//}


test('测试', ()=> {
    expect(checkArrayHasMin([1,2],[1])).toEqual(true)
})

export {}