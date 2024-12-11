# unplugin-next-app-router

[![NPM version](https://img.shields.io/npm/v/unplugin-next-app-router?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-next-app-router)

File-based routing, similar to SvelteKit and Next.js App Router. Powered by [unplugin](https://github.com/unjs/unplugin).

## Install

```bash
npm i -D unplugin-next-app-router
# or
yarn add -D unplugin-next-app-router
# or
pnpm add -D unplugin-next-app-router
# or
bun add -D unplugin-next-app-router
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import NextAppRouter from 'unplugin-next-app-router/vite'

export default defineConfig({
    plugins: [
        NextAppRouter({
            /* options */
        }),
    ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import NextAppRouter from 'unplugin-next-app-router/rollup'

export default {
    plugins: [
        NextAppRouter({
            /* options */
        }),
    ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
    /* ... */
    plugins: [
        require('unplugin-next-app-router/webpack')({
            /* options */
        }),
    ],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import NextAppRouter from 'unplugin-next-app-router/esbuild'

build({
    plugins: [NextAppRouter()],
})
```

<br></details>

## Setup

```ts
// env.d.ts
/// <reference types="vite/client" />
/// <reference types="unplugin-next-app-router/client" />
```

```json lines
// tsconfig.json
{
    "compilerOptions": {
        // ...
        "types": ["unplugin-vue-router/client"]
    }
}
```

```diff
 import { StrictMode } from 'react'
 import { createRoot } from 'react-dom/client'
 import { RouterProvider } from 'react-router'
+import { browserRouter } from 'virtual:unplugin-next-app-router'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
-       <App/>
+       <RouterProvider router={browserRouter} />
    </StrictMode>,
)
```
