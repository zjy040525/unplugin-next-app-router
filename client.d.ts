declare module 'virtual:unplugin-next-app-router' {
    import { type createBrowserRouter, type RouteObject } from 'react-router'

    export const routes: RouteObject[]
    export const browserRouter: ReturnType<typeof createBrowserRouter>
}
