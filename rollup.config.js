import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
// import { eslint } from 'rollup-plugin-eslint';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import license from "rollup-plugin-license";
import filesize from "rollup-plugin-filesize";
import resolve from "@rollup/plugin-node-resolve";
import localResolve from "rollup-plugin-local-resolve";
import sass from "node-sass";
import autoprefixer from "autoprefixer";
import postcss from "rollup-plugin-postcss";
// import stylelint from 'rollup-plugin-stylelint';
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const banner = ["/*!", pkg.name, pkg.version, "*/\n"].join(" ");

const plugins = [
  peerDepsExternal(),
  postcss({
    preprocessor: (_, id) =>
      new Promise(resolve => {
        const result = sass.renderSync({ file: id });
        resolve({ code: result.css.toString() });
      }),
    plugins: [autoprefixer],
    minimize: true,
    sourceMap: true,
    extract: true,
    extensions: [".sass", ".scss", ".css"]
  }),
  babel({
    runtimeHelpers: true,
    exclude: "node_modules/**"
  }),
  resolve(),
  localResolve(),
  commonjs(),
  terser({
    sourcemap: true,
    output: {
      comments: "false"
    }
  }),
  license({
    banner
  }),
  filesize()
].filter(Boolean);

const resolutions = {
  globals: {
    react: "React",
    "react-is": "reactIs",
    "rc-trigger": "Trigger"
  },
  exports: "named"
};

const output = [
  {
    file: pkg.browser,
    format: "umd",
    name: "UMD-MDEditor",
    ...resolutions
  },
  {
    file: pkg.main,
    format: "cjs",
    name: "CJS-MDEditor",
    ...resolutions
  },
  {
    file: pkg.browser,
    format: "es",
    sourcemap: true,
    name: "MDEditor",
    ...resolutions
  }
];

export default {
  input: "./src/index.js",
  output,
  // external,
  plugins
};