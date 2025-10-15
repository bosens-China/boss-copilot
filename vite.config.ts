import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import monkey, {
  // cdn,
  util,
} from 'vite-plugin-monkey';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tsconfigPaths from 'vite-tsconfig-paths';
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    mdPlugin({
      mode: [Mode.VUE],
    }),
    vueJsx(),
    UnoCSS(),
    AutoImport({
      eslintrc: {
        enabled: true,
      },
      dts: true,
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
        util.unimportPreset,
      ],
    }),
    tsconfigPaths({
      loose: true,
    }),
    Components({
      dts: true,
      resolvers: [NaiveUiResolver()],
    }),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://static.zhipin.com/favicon.ico',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.zhipin.com/web/geek/jobs*'],
        'run-at': 'document-start',
      },
      build: {
        externalGlobals: {
          // vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          // 'naive-ui': cdn.jsdelivr('naive-ui', 'dist/index.prod.js'),
          // https://unpkg.com/naive-ui@2.43.1/dist/index.prod.js
        },
      },
    }),
  ],
});
