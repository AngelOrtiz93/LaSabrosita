import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
  // Define los archivos a los que se aplicará esta configuración
  { files: ["**/*.{js,mjs,cjs,vue}"] },

  // Define el entorno global para el código JavaScript en el navegador
  { languageOptions: { globals: globals.browser } },

  // Extiende la configuración recomendada de ESLint para JavaScript
  pluginJs.configs.recommended,

  // Extiende la configuración "essential" de ESLint para Vue.js
  ...pluginVue.configs["flat/essential"],
];
