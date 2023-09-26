import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, './src/build.ts'),
            name: 'transactionlink-js',
            fileName: (format) => `transactionlink-js.${format}.js`,
        },
    },
})
