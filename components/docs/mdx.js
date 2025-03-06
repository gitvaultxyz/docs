import { cn } from '@/lib/utils'
import Head from 'next/head'
import { docsConfig } from '@/config/docs'

export function MDXContent({ children, className }) {
  // Extract the first h1 heading from children if it exists
  let pageTitle = ''
  if (Array.isArray(children)) {
    const h1Element = children.find(child => 
      child?.props?.mdxType === 'h1' || 
      child?.props?.originalType === 'h1'
    )
    if (h1Element) {
      pageTitle = h1Element.props.children
    }
  }

  return (
    <>
      <Head>
        {pageTitle && (
          <title>{`${pageTitle} - ${docsConfig.site.title}`}</title>
        )}
      </Head>
      <div className={cn(
        'mdx',
        'w-full max-w-3xl mx-auto py-8 px-4',
        className
      )}>
        {children}
      </div>
    </>
  )
} 