import { UserConfig } from 'unocss'
import { presetAttributify, presetUno, presetIcons } from 'unocss'

export const unoConfig: UserConfig = {
  presets: [presetAttributify(), presetUno(), presetIcons()],
  rules: [
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: '1px solid var(--hp-c-divider-light)',
      }),
    ],
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'menu-item-before':
      'mr-12px ml-12px w-1px h-24px bg-divider-light content-[""]',
    'gradient-title':
      'bg-gradient-to-rb from-home-hero-name-background-from to-home-hero-name-background-to bg-clip-text text-transparent',
    'border-px': 'border-1px border-solid',
  },
  theme: {
    // key不能使用 'xxx-xxx'格式
    colors: {
      // 包含dark主题的，vscode显示颜色的功能会显示dark的颜色，不影响代码
      bg: {
        default: 'var(--hp-c-bg)',
        soft: 'var(--hp-c-bg-soft)',
        mute: 'var(--hp-c-bg-mute)',
        alt: 'var(--hp-c-bg-alt)',
        inverse: 'var(--hp-c-bg-inverse)',
      },
      divider: {
        default: 'var(--hp-c-divider)',
        light: 'var(--hp-c-divider-light)',
        dark: 'var(--hp-c-divider-dark)',
      },

      text: {
        1: 'var(--hp-c-text-1)',
        2: 'var(--hp-c-text-2)',
        3: 'var(--hp-c-text-3)',
        4: 'var(--hp-c-text-4)',
        code: 'var(--hp-c-text-code)',
      },
      button: {
        brand: {
          border: 'var(--hp-button-brand-border)',
          text: 'var(--hp-button-brand-text)',
          bg: 'var(--hp-button-brand-bg)',
          hover: {
            border: 'var(--hp-button-brand-hover-border)',
            text: 'var(--hp-button-brand-hover-text)',
            bg: 'var(--hp-button-brand-hover-bg)',
          },
          active: {
            border: 'var(--hp-button-brand-active-border)',
            text: 'var(--hp-button-brand-active-text)',
            bg: 'var(--hp-button-brand-active-bg)',
          },
        },
        alt: {
          border: 'var(--hp-button-alt-border)',
          text: 'var(--hp-button-alt-text)',
          bg: 'var(--hp-button-alt-bg)',
          hover: {
            border: 'var(--hp-button-alt-hover-border)',
            text: 'var(--hp-button-alt-hover-text)',
            bg: 'var(--hp-button-alt-hover-bg)',
          },
          active: {
            border: 'var(--hp-button-alt-active-border)',
            text: 'var(--hp-button-alt-active-text)',
            bg: 'var(--hp-button-alt-active-bg)',
          },
        },
      },
      // 基础
      gray: {
        default: 'var(--hp-c-gray)',
        light: {
          1: 'var(--hp-c-gray-light-1)',
          2: 'var(--hp-c-gray-light-2)',
          3: 'var(--hp-c-gray-light-3)',
          4: 'var(--hp-c-gray-light-4)',
        },
      },
      brand: {
        default: 'var(--hp-c-brand)',
        light: 'var(--hp-c-brand-light)',
        dark: 'var(--hp-c-brand-dark)',
      },
      home: {
        hero: {
          name: {
            background: {
              from: 'var(--hp-home-hero-name-background-from)',
              to: 'var(--hp-home-hero-name-background-to)',
            },
          },
        },
      },
    },
    boxShadow: {
      1: '0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
      2: '0 3px 12px rgba(0, 0, 0, 0.07), 0 1px 4px rgba(0, 0, 0, 0.07)',
      3: '0 12px 32px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08)',
      4: '0 14px 44px rgba(0, 0, 0, 0.12), 0 3px 9px rgba(0, 0, 0, 0.12)',
      5: '0 18px 56px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.16)',
    },
    height: {
      nav: 'var(--hp-nav-height)',
    },
    width: {
      sidebar: 'var(--hp-sidebar-width)',
      toc: 'var(--hp-toc-width)',
    },
    spacing: {
      nav: 'var(--hp-nav-height)',
      sidebar: 'var(--hp-sidebar-width)', // 在w与h中无法使用
    },
    zIndex: {
      // 配置无效
    },
    breakpoints: {
      md: '960px',
      lg: '1440px', // 无法用css变量
    },
  },
}
