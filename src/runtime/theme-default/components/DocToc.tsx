import { useRef } from 'react'
import { PropsWithIsland, TocItem } from 'shared/types'
import { useTocHMR } from '../hooks/useTocHMR'
import { scrollToTarget, useTocScroll } from '../hooks/useTocScroll'
import { isArrayEmpty } from '../utils'

interface TocProps extends PropsWithIsland {
  toc?: TocItem[]
}

export function DocToc({ toc: initialToc = [] }: TocProps) {
  const toc = useTocHMR(initialToc)

  const hasToc = !isArrayEmpty(toc)

  const highlightRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useTocScroll(highlightRef, containerRef)

  return (
    <div className="w-toc flex-col hidden" un-lg="flex">
      <div>
        {hasToc && (
          <div
            id="toc-container"
            ref={containerRef}
            className="relative divider-left px-16px text-13px font-500"
          >
            <div
              id="toc-highlight"
              ref={highlightRef}
              className="absolute top-33px -left-1px opacity-0 w-1px h-18px bg-brand-default"
              style={{
                transition:
                  'top 0.25s cubic-bezier(0, 1, 0.5, 1), background-color 0.5s, opacity 0.25s',
              }}
            ></div>

            <div className="text-13px leading-28px font-600">本页目录</div>

            <nav>
              <ul className="relative">
                {toc?.map((item) => (
                  <TocLi key={item.id} item={item}></TocLi>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

function TocLi({ item }: { item: TocItem }) {
  return (
    <li>
      <a
        href={`#${item.id}`}
        className="block text-text-2 leading-28px transition-colors duration-250 overflow-hidden whitespace-nowrap"
        un-hover="text-text-1"
        style={{
          textOverflow: 'ellipsis',
          paddingLeft: (item.depth - 2) * 12,
        }}
        onClick={(e) => {
          e.preventDefault()
          const targetDom = document.getElementById(item.id)
          targetDom && scrollToTarget(targetDom)
        }}
      >
        {item.text}
      </a>
    </li>
  )
}
