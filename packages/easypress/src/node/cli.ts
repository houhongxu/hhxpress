import { buildRuntime } from './build'
import { resolveSiteConfig } from './config'
import { ROOT_PATH } from './consts'
import { createRuntimeDevServer } from './server'
import { program } from 'commander'
import fse from 'fs-extra'
import path from 'path'

// 作者推荐以单文件组织cli https://github.com/tj/commander.js/issues/983

export const cli = program

const { version } = fse.readJSONSync(path.join(ROOT_PATH, './package.json'))

cli.name('easypress').version(version)

cli
  .command('dev', { isDefault: true })
  .argument('[root]', 'dev server root dir', process.cwd())
  .description('dev server') // 单独使用description才使命令参数生效
  .option('-p,--port <value>', 'dev server port')
  .action(async (root, { port }) => {
    const absRoot = path.resolve(root)

    const createServer = async () => {
      // 每次开启服务都要先读取配置文件
      const siteConfig = await resolveSiteConfig({
        root,
        mode: 'development',
        command: 'serve',
      })

      const server = await createRuntimeDevServer({
        root: absRoot,
        siteConfig,
        restartRuntimeDevServer: async () => {
          await server.close()

          await createServer()
        },
      })

      await server.listen(port)

      server.printUrls()
    }

    await createServer()
  })

cli
  .command('build')
  .argument('[root]', 'build root dir', process.cwd())
  .description('build')
  .action(async (root) => {
    try {
      const absRoot = path.resolve(root)

      const siteConfig = await resolveSiteConfig({
        root,
        mode: 'production',
        command: 'build',
      })

      await buildRuntime({ root: absRoot, siteConfig })
    } catch (e) {
      console.log(e)
    }
  })

cli.parse()
