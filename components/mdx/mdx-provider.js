import { MDXRemote } from 'next-mdx-remote'
import components from './mdx-components'

export function MDXProvider({ source }) {
  return (
    <div className="mdx">
      <MDXRemote {...source} components={components} />
    </div>
  )
} 