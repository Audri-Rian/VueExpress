// src/shims-vue.d.ts

// 1) Declara que todo import “*.vue” é um componente Vue
declare module '*.vue' {
  import { DefineComponent } from 'vue';

  // 2) Define um tipo genérico: componente com props quaisquer
  const component: DefineComponent<{}, {}, any>;

  // 3) Exporta como default
  export default component;
}
