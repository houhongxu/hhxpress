import { ComponentType } from 'react'
import { UserConfig as ViteConfiguration } from 'vite'
/**
 * 网站配置
 */
export interface SiteConfig {
  root: string
  configPath: string
  siteData: UserConfig
}

/**
 * 用户配置
 */
export interface UserConfig {
  title?: string
  description?: string

  themeConfig?: ThemeConfig
  vite?: ViteConfiguration
}

/**
 * 主题配置
 */
export interface ThemeConfig {
  nav?: NavItemWithLink[]
  sidebar?: Sidebar
  footer?: Footer
}

/**
 * 导航栏
 */
export type NavItemWithLink = {
  text: string
  link: string
}

/**
 * 侧边栏
 */
export interface Sidebar {
  [path: string]: SidebarGroup[]
}

export interface SidebarGroup {
  text?: string
  items: SidebarItem[]
}

export type SidebarItem =
  | { text: string; link: string }
  | { text: string; link?: string; items: SidebarItem[] }

/**
 * 页脚
 */
export interface Footer {
  message?: string
  copyright?: string
}

export type PageType = 'home' | 'doc' | 'custom' | '404'

export interface FrontMatter {
  title?: string
  description?: string
  pageType?: PageType
  sidebar?: boolean
  outline?: boolean

  features?: Feature[]
  hero?: Hero
}
export interface Header {
  id: string
  text: string
  depth: number
}
export interface PageData {
  siteData: UserConfig
  pagePath: string
  frontmatter: FrontMatter
  pageType: PageType
  toc?: Header[]
}

export interface PageModule {
  default: ComponentType
  frontmatter?: FrontMatter
  toc?: Header[]
  [key: string]: unknown
}

export interface Feature {
  icon: string
  title: string
  details: string
}

export interface Hero {
  name: string
  text: string
  tagline: string
  image?: {
    src: string
    alt: string
  }
  actions: {
    text: string
    link: string
    theme: 'brand' | 'alt'
  }[]
}
