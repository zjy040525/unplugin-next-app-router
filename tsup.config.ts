import { type Options } from 'tsup'

export default {
    entry: ['src/*.ts'],
    clean: true,
    format: ['cjs', 'esm'],
    dts: true,
    cjsInterop: true,
    splitting: true,
    onSuccess: 'npm run build:fix',
} satisfies Options
