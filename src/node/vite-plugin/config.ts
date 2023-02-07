import { relative } from 'path'
import { Plugin } from 'vite'
import { SiteConfig } from '../../shared/types/index'

const SITE_DATA_ID = 'hhx-docs:site-data'
const RESOLVED_SITE_DATA_ID = '\0' + 'hhx-docs:site-data'

/**
 * 通过虚拟模块使客户端可以访问配置文件
 */
export function pluginConfig(
  config: SiteConfig,
  restartServer: () => Promise<void>
): Plugin {
  return {
    name: 'hhx-docs:config',
    // 解析模块id
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return RESOLVED_SITE_DATA_ID
      }
    },
    load(id) {
      if (id === RESOLVED_SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`
      }
    },
    // 处理热更新
    async handleHotUpdate(ctx) {
      // 监听的文件路径
      const customWatchedFiles = [config.configPath]

      // 判断文件变化是否包含
      const include = (id: string) =>
        customWatchedFiles.some((file) => id.includes(file))

      if (include(ctx.file)) {
        console.log(
          `\n${relative(
            config.root,
            ctx.file
          )} changed, restarting server... / \n${relative(
            config.root,
            ctx.file
          )} 文件变化, 重启服务中。。。`
        )

        // 重点: 重启 Dev Server需要重新读取配置
        await restartServer()
      }
    },
  }
}
