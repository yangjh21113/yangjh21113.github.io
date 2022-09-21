
export function checkArrayHasMin(arr1, arr2) {
	let min = [Math.min(...arr1), Math.min(...arr2)]
	let max = [Math.max(...arr1), Math.max(...arr2)]
	return Math.max(...min) <= Math.min(...max)
}


//module.exports = {
//    checkArrayHasMin
//}


