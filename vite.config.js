import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    // 构建目标：支持ES2015+的现代浏览器，提供更好的性能
    target: 'es2015',
    // 生产环境不生成sourcemap，减小包体积
    sourcemap: false,
    // 启用CSS代码分割，按需加载CSS文件
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // 手动分包：将第三方库分离到独立的chunk中
        // 这样可以更好地利用浏览器缓存，当业务代码更新时，第三方库不需要重新下载
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'antd-vendor': ['antd'],
          'icons-vendor': ['lucide-react'],
        },
        // 文件命名规则：包含hash值用于缓存控制
        chunkFileNames: 'assets/js/[name]-[hash].js', // 代码分割的chunk文件
        entryFileNames: 'assets/js/[name]-[hash].js', // 入口文件
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // 静态资源文件
      },
    },
    // 当chunk大小超过1000kb时显示警告
    chunkSizeWarningLimit: 1000,
  },

  // 依赖预构建优化：明确指定需要预构建的依赖
  // 这可以避免首次启动时的依赖发现过程，提升开发服务器启动速度
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'antd',
      'lucide-react',
    ],
  },
})
