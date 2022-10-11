import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    //format: 'iife',
    name: 'bundleName',
    globals: {
      lodash: '_',
      jquery: '$',
    },
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
    resolve(),
    //typescript(),
    terser(),
    postcss(),
    serve({
      //open: true,
      port: 3001,
      contentBase: '',
    }),
  ],
  external: ['lodash', 'jquery'],
};
