import classNames from 'classnames'
import { ReactNode } from 'react'

interface LinkProps {
  href?: string
  className?: string
  children?: ReactNode
  hover?: boolean | string
}

// TODO 适配折叠侧边栏

export function Link({ className, children, href, hover = false }: LinkProps) {
  const isExternal = /^https?/.test(href ?? '')
  const target = isExternal ? '_blank' : undefined
  const rel = isExternal ? 'nofollow noopener noreferrer' : undefined
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={classNames(
        className,
        'block text-14px font-500',
        !href && 'cursor-default pointer-events:none',
      )}
      un-hover={
        hover
          ? classNames(
              hover,
              typeof hover === 'boolean' &&
                'text-brand-default transition-colors duration-250',
            )
          : undefined
      }
    >
      {children}
    </a>
  )
}
