import babel from '@babel/core'

const code = `import checkArrayHasMin from './4.js'`

babel.transform(code, (err, result) => {

    console.log(err, result)
})