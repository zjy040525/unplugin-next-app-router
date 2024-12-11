export interface Options {
    /**
     * 包含的文件将根据目录路径转换为路由
     * @default ['src/app/**\/index.tsx']
     */
    include?: string[]
    /**
     * 替换目录路径部分为空
     * @default /^src\/app\//
     */
    replacement?: RegExp
    /**
     * 打印转换的原始内容
     */
    logNative?: boolean
}

export interface Metadata {
    /**
     * 是否为嵌套路由
     */
    nested?: boolean
}
