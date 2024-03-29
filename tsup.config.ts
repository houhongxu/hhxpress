import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/node/cli.ts', 'src/node/index.ts', 'src/node/dev.ts'],
  bundle: true,
  splitting: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  shims: true, // 兼容esm与cjs的全局变量 如 __dirname
  clean: true,
})
