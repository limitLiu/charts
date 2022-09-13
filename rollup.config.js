import resolve from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/charts.js',
      format: 'cjs',
    },
    {
      file: 'esm/charts.js',
      format: 'es',
    },
    {
      file: 'dist/charts.js',
      name: 'charts',
      format: 'umd',
    }
  ],
  plugins: [
    resolve(),
    typescript()
  ]
};
