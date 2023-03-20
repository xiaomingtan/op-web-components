import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
// import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { genHostCss } from './src/variable/theme.ts';
import path from 'path';

const projectRootDir = path.resolve(__dirname);

const customResolver = nodeResolve({
  extensions: ['.js', '.ts', '.json', '.css']
});

function cssHandler() {
  return {
    name: 'my-example', // 名字用来展示在警告和报错中
    resolveId(source) {
      if (source === 'virtual-module') {
        return source; // rollup 不应该查询其他插件或文件系统
      }
      return null; // other ids 正常处理
    },
    load(id) {
      if (id.endsWith('.css')) {
        const content = fs.readFileSync(id);
        return `export default \`${genHostCss()} ${content.toString()}\``;
      }
      return null; // other ids
    }
  };
}

export default [
  {
    input: 'src/main.ts',

    output: {
      file: 'dist/bundle.js',
      format: 'es'
    },

    plugins: [
      alias({
        entries: [
          {
            find: '@',
            replacement: path.resolve(projectRootDir, 'src')
          }
        ],
        customResolver
      }),
      commonjs(),
      typescript(),
      nodeResolve(),
      terser(),
      cssHandler(),
      serve(),
      livereload()
    ]
  }
];
