import chalk from 'chalk'
import ts from 'typescript'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { name } from '../package.json'
import { createAST } from './core/ast'
import { createDirectory } from './core/directory'
import { createBrowserPath, createImportPath } from './core/path'
import { createStructure } from './core/structure'
import type { Options } from './types'

const virtualModuleId = `virtual:${name}`
const resolvedVirtualModuleId = '\0' + virtualModuleId

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => ({
    name,
    resolveId(id) {
        if (id === virtualModuleId) {
            return resolvedVirtualModuleId
        }
    },
    load(id) {
        if (id !== resolvedVirtualModuleId) {
            return
        }

        const directory = createDirectory(options?.include)
        const browserPath = createBrowserPath(directory, options?.replacement)
        const importPath = createImportPath(browserPath)
        const structure = createStructure(importPath)
        const ast = createAST(structure)
        const tsFile = ts.factory.createSourceFile(
            ast,
            ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
            ts.NodeFlags.None,
        )

        const tsCode = ts.createPrinter().printFile(tsFile)
        const jsCode = ts.transpileModule(tsCode, {
            compilerOptions: {
                module: ts.ModuleKind.ESNext,
                target: ts.ScriptTarget.ESNext,
            },
        })

        if (options?.logNative) {
            console.log(chalk.cyan.inverse(` ${name} `), `\n${jsCode.outputText}`)
        }

        return jsCode.outputText
    },
})

export default createUnplugin(unpluginFactory)
