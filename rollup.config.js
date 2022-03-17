// rollup.config.js

import merge from 'deepmerge';
import dts from "rollup-plugin-dts";
import typescript from '@rollup/plugin-typescript';
import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig();

export default merge(baseConfig, [
  {
    input: 'build/compiled/index.d.ts',
    output: {
        file: 'lib/dts/graphdb-layer.d.ts',
        format: 'es'
    },
    plugins: [ dts() ]
  },
  {
    input: 'build/compiled/index.js',
    output: {
        file: 'lib/graphdb-layer.js',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [ typescript() ]
  }
]);