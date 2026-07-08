import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

// Flags come from the CLI --environment switch (cross-platform, so the
// same scripts run on Windows dev machines and the Ubuntu deploy runner):
//   build:prod     -> BUILD:production
//   build:analyze  -> BUILD:production,ANALYZE:true
const isProduction = process.env.BUILD === 'production';
const analyze = process.env.ANALYZE === 'true';

export default {
  input: 'readerview.js',
  output: {
    // Fixed filenames: host pages hard-reference these. No content hashing.
    file: isProduction ? 'dist/readerview.min.js' : 'dist/readerview.dev.js',
    // Self-executing bundle. The entry has no exports (it runs a guarded
    // IIFE on load), so no `name` is needed. Rollup scope-hoists the whole
    // module graph into one flat IIFE with no per-module runtime wrappers.
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    nodeResolve({ browser: true }),
    // localstorage-slim ships CommonJS only; micromodal resolves to its ESM
    // build via the `module` field. commonjs() bridges the CJS dep.
    commonjs(),
    isProduction &&
      terser({
        compress: { drop_console: true, drop_debugger: true, passes: 2 },
        format: { comments: false },
        // Do NOT mangle property names: the widget reads host-provided
        // globals and DOM by string key.
        mangle: true,
      }),
    analyze &&
      visualizer({
        filename: 'bundle-report.html',
        template: 'treemap',
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
};
