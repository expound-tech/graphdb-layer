// rollup.config.js

import merge from 'deepmerge';
import dts from "rollup-plugin-dts";
import html from '@web/rollup-plugin-html';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { createBasicConfig } from '@open-wc/building-rollup';

import pkg from './package.json';

const baseConfig = createBasicConfig({
  // use the outputdir option to modify where files are output
  // outputDir: 'dist',

  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  // legacyBuild: true,

  // development mode creates a non-minified build for debugging or development
  developmentMode: process.env.ROLLUP_WATCH === 'true',

  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: true,

  polyfillsLoader: {
    polyfills: {
      webcomponents: false,
      intersectionObserver: true,
      resizeObserver: true,
      // custom: [
      //   {
      //     name: 'my-feature-polyfill',
      //     path: require.resolve('my-feature-polyfill'),
      //     test: "!('myFeature' in window)",
      //     minify: true,
      //   },
      // ],
    },
  },
});

export default merge(baseConfig, [
  { 
    input: 'src/docs.html',
    output: { dir: 'lib/docs' },
    plugins: [ html({
      minify: true,
      absoluteBaseUrl: 'https://domain.com',
      transformHtml: [
        // inject lang attribute
        html => html.replace('<html>', '<html lang="cmn">'),
        // inject app version
        html =>
          html.replace(
            '</body>',
            `<script>window.APP_VERSION = "${pkg.version}"</script></body>`,
          ),
      ]
    }) ],
  },
  {
    input: 'build/compiled/index.d.ts',
    output: {
        file: 'lib/index.d.ts',
        format: 'cjs'
    },
    plugins: [ dts() ]
  },
  {
    input: 'src/index.ts',
    output: {
        file: 'lib/index.js',
        format: 'cjs',
        name: 'graphdb_layer',
        sourcemap: true
    },
    external: [ 'edgedb' ],
    plugins: [ typescript(), terser() ]
  }
]);