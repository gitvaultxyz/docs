import { MDXRemote } from 'next-mdx-remote'
import { components } from './mdx-components'
import { Icons } from './icons'

export function MDXProvider({ source, frontmatter }) {
  return (
    <div className="mdx">
      <MDXRemote 
        {...source} 
        components={{
          ...components,
          Icons
        }} 
      />
    </div>
  )
} 