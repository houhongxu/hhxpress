import rollupPluginMdx from '@mdx-js/rollup'
import { Plugin } from 'vite'
import remarkPluginGFM from 'remark-gfm'
import rehypePluginSlug from 'rehype-slug'
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypePrettyCode from 'rehype-pretty-code'
import { remarkPluginMdxToc } from './remarkPluginMdxToc'

export function createRollupPluginMdx(): Plugin {
  return rollupPluginMdx({
    remarkPlugins: [
      remarkPluginGFM,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkPluginMdxToc,
    ],
    rehypePlugins: [
      rehypePluginSlug,
      [
        rehypePluginAutolinkHeadings,
        {
          properties: {
            class: 'autolink-header',
          },
          content: {
            type: 'text',
            value: '#',
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: 'nord',
          keepBackground: true,
        },
      ],
    ],
  })
}
