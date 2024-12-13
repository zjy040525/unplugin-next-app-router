import ts from 'typescript'
import { type createStructure } from './structure'

export const createAST = <T extends ReturnType<typeof createStructure>>(sources: T) => {
    const createRouter = (deepNode: T) => {
        return deepNode.map((node) => {
            const propertyAssignments = [
                ts.factory.createPropertyAssignment(
                    ts.factory.createIdentifier('path'),
                    ts.factory.createStringLiteral(node.browserPath),
                ),
                ts.factory.createMethodDeclaration(
                    void 0,
                    void 0,
                    ts.factory.createIdentifier('lazy'),
                    void 0,
                    void 0,
                    [],
                    void 0,
                    ts.factory.createBlock(
                        [
                            ts.factory.createReturnStatement(
                                ts.factory.createCallExpression(
                                    // @ts-expect-error
                                    ts.factory.createToken(ts.SyntaxKind.ImportKeyword),
                                    void 0,
                                    [ts.factory.createStringLiteral(node.importPath)],
                                ),
                            ),
                        ],
                        true,
                    ),
                ),
            ]
            if (node.children.length) {
                propertyAssignments.push(
                    ts.factory.createPropertyAssignment(
                        ts.factory.createIdentifier('children'),
                        ts.factory.createArrayLiteralExpression(createRouter(node.children as T), true),
                    ),
                )
            }
            return ts.factory.createObjectLiteralExpression(propertyAssignments, true)
        })
    }
    return [
        ts.factory.createImportDeclaration(
            void 0,
            ts.factory.createImportClause(
                false,
                void 0,
                ts.factory.createNamedImports([
                    ts.factory.createImportSpecifier(false, void 0, ts.factory.createIdentifier('createBrowserRouter')),
                ]),
            ),
            ts.factory.createStringLiteral('react-router'),
            void 0,
        ),
        ts.factory.createVariableStatement(
            [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
            ts.factory.createVariableDeclarationList(
                [
                    ts.factory.createVariableDeclaration(
                        ts.factory.createIdentifier('routes'),
                        void 0,
                        void 0,
                        ts.factory.createArrayLiteralExpression(createRouter(sources), true),
                    ),
                ],
                ts.NodeFlags.Const,
            ),
        ),
        ts.factory.createVariableStatement(
            [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
            ts.factory.createVariableDeclarationList(
                [
                    ts.factory.createVariableDeclaration(
                        ts.factory.createIdentifier('browserRouter'),
                        void 0,
                        void 0,
                        ts.factory.createCallExpression(ts.factory.createIdentifier('createBrowserRouter'), void 0, [
                            ts.factory.createIdentifier('routes'),
                        ]),
                    ),
                ],
                ts.NodeFlags.Const,
            ),
        ),
    ]
}
