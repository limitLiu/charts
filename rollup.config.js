import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './src/index.bs.js',
  output: [
    {
      file: 'cjs/sparrow.js',
      format: 'cjs',
    },
    {
      file: 'esm/sparrow.js',
      format: 'es',
    },
    {
      file: 'dist/sparrow.min.js',
      name: 'sparrow',
      format: 'umd',
    },
  ],
  plugins: [resolve(), babel()],
};
