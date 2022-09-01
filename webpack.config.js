import path from 'path';
import { fileURLToPath } from 'url';

const dirName = path.dirname(fileURLToPath(import.meta.url));

const baseConfig = {
  entry: path.resolve(dirName, 'readerview.js'),
  output: {
    path: path.resolve(dirName, 'dist'),
  },
};

export default function (_env, argv) {
  if (argv.mode === 'production') {
    baseConfig.output.filename = 'readerview.min.js';
  }

  if (argv.mode === 'development') {
    baseConfig.output.filename = 'readerview.dev.js';
  }

  return baseConfig;
}
