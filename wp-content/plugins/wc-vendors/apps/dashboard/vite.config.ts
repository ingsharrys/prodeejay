import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'url';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';

export default (mode: string) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false
          })
        ]
      })
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('../../apps/dashboard/src', import.meta.url))
        },
        { find: /^vue$/, replacement: 'vue/dist/vue.esm-bundler.js' },
        { find: /^~/, replacement: '' }
      ]
    },
    root: fileURLToPath(new URL('../../apps/dashboard', import.meta.url)),
    server: {
      cors: true,
      strictPort: true,
      host: env.VITE_DEV_SERVER_HOST || 'localhost',
      port: env.VITE_DEV_SERVER_PORT
        ? parseInt(env.VITE_DEV_SERVER_PORT)
        : 3000,
      hmr: {
        host: env.VITE_DEV_SERVER_HOST || 'localhost',
        port: env.VITE_DEV_SERVER_PORT
          ? parseInt(env.VITE_DEV_SERVER_PORT)
          : 3000,
        protocol: 'ws'
      }
    },
    build: {
      outDir: fileURLToPath(new URL('../../apps/dashboard/dist', import.meta.url)),
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        input: {
          main: fileURLToPath(
            new URL('../../apps/dashboard/src/main.ts', import.meta.url)
          )
        },
        output: {
          globals: {
            '@wordpress/i18n': 'wp.i18n',
          },
          entryFileNames: '[name].[hash].js',
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            antd: ['@ant-design/icons-vue']
          },
          chunkFileNames: ({ isDynamicEntry, name, facadeModuleId }) => {
            if (isDynamicEntry && facadeModuleId) {
              const fileNameParts = facadeModuleId.split('src/')[1].split('/');
              const chunkPath = fileNameParts.slice(0, -1).join('/');

              return `${chunkPath}/[name].[hash].js`;
            }

            return 'common/[name].[hash].js';
          }
        }
      }
    },
    experimental: {
      renderBuiltUrl: (fileName: string, { hostType }) => {
        if (hostType === 'js') {
          return {
            runtime: `window.wcv_dashboard_data.pluginDirUrl + '/dist/${fileName}'`
          };
        } else if (hostType === 'css') {
          return {
            runtime: `window.wcv_dashboard_data.pluginDirUrl + '/dist/assets/${fileName}'`
          };
        }
        return fileName;
      }
    }
  });
};
