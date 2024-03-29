import { useLocation } from 'react-router-dom'
import { Content } from 'runtime/Content'
import { DocFooter } from '../components/DocFooter'
import { DocToc } from '../components/DocToc'
import { Sidebar } from '../components/Sidebar'
import { usePageData } from '../../usePageData'
import { useSidebarData } from '../hooks/useSidebarData'

export function DocLayout() {
  const { data } = useSidebarData()
  const { toc, userConfig } = usePageData()

  return (
    <div>
      <Sidebar
        __island
        nav={userConfig.themeConfig?.nav}
        sidebarData={data}
      ></Sidebar>

      <div className="flex justify-between p-48px pr-0" un-md="ml-sidebar">
        <div className="w-full max-w-960px mx-auto pr-48px">
          <div className="hp-doc">
            <Content></Content>
          </div>

          <DocFooter></DocFooter>
        </div>

        <div className="sticky flex-shrink-0 top-88px h-100vh overflow-x-hidden overflow-y-auto">
          <DocToc toc={toc} __island></DocToc>
        </div>
      </div>
    </div>
  )
}
