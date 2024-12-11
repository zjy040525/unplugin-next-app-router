import path from 'node:path'
import { type createDirectory } from './directory'

export const createImportPath = <T extends ReturnType<typeof createDirectory>[number]>(sources: T[]) => {
    return sources.map((source) => {
        return {
            ...source,
            importPath: path.join(process.cwd(), source.source),
        }
    })
}

export const createBrowserPath = <T extends ReturnType<typeof createDirectory>[number]>(
    sources: T[],
    replacement = /^src\/app\//,
) => {
    return sources.map((source) => {
        const path = source.source
            .replace(replacement, '')
            .replace(/\/?index.tsx$/, '')
            .replace(/\[(.*?)]/g, ':$1')
        return {
            ...source,
            browserPath: '/' + path,
        }
    })
}
