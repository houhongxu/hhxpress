import fg from 'fast-glob'
import path from 'path'
import { SiteConfig } from 'shared/types'
import { Plugin } from 'vite'

interface vitePluginVirtualRoutesOptions {
  docs: string
  siteConfig: SiteConfig
}

// 虚拟模块将node端读取的routes数据传递给client端，不需要生成入口文件来处理client端路由了
export function vitePluginVirtualRoutes({
  docs,
}: vitePluginVirtualRoutesOptions): Plugin {
  const virtualModuleId = 'virtual:routes'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vitePluginVirtualRoutes',
    resolveId(id) {
      if (id === virtualModuleId) {
        // 解析为rollup虚拟模块，避免其他插件load这个id
        return resolvedVirtualModuleId
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        // glob文件
        const files = await fg.glob('**/*.{jsx,tsx,md,mdx}', {
          ignore: ['node_modules/**', 'client/**', 'server/**'],
          cwd: docs,
          deep: 2,
          absolute: true,
        })

        let importTemplate = 'import React from "react";\n'

        // 根据文件获取路由
        const routes = files.map((file, index) => {
          const relativePath = path.relative(docs, file)
          const pathname = relativePath
            .replace(path.extname(file), '')
            .replace(/index$/, '')

          importTemplate += `import Element${index + 1} from '${file}';\n`

          return `{ path: '/${pathname}', element: React.createElement(Element${index + 1}), preload: ()=> import('${file}') },\n`
        })

        return `
        ${importTemplate}
        export default [${routes.join('')}]
        `
      }
    },
  }
}