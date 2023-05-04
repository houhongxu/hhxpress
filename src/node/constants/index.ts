// 路径常量，相对于dist文件夹

import path from 'path'

export const PACKAGE_ROOT_PATH = path.join(__dirname, '..')

export const DEFAULT_HTML_PATH = path.join(PACKAGE_ROOT_PATH, 'template.html')

export const CLIENT_ENTRY_PATH = path.join(
  PACKAGE_ROOT_PATH,
  'src',
  'runtime',
  'client-entry.tsx',
)

export const SERVER_ENTRY_PATH = path.join(
  PACKAGE_ROOT_PATH,
  'src',
  'runtime',
  'server-entry.tsx',
)

export const SUPPORT_CONFIG_FILE = ['config.ts', 'config.js']
