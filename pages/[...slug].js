import { getDocBySlug, getAllDocs } from '../lib/mdx'
import { MDXProvider } from '../components/mdx-provider'
import { DocsLayout } from '../components/layouts/docs-layout'
import { components } from '../components/mdx-components'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Share2 } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Doc({ doc }) {
  const [copied, setCopied] = useState(false)
  const isComponentPage = doc.slug?.startsWith('components/') || doc.frontmatter?.type === 'component'
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!doc || !doc.source) {
    return (
      <DocsLayout>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-lg text-muted-foreground">Document not found</p>
        </div>
      </DocsLayout>
    )
  }

  return (
    <DocsLayout>
      <div className={cn("px-4 pt-4 md:px-8 md:pt-8", isComponentPage && "pb-8 md:pb-16")}>
        <Card className={cn(
          "overflow-hidden border-none bg-gradient-to-b from-primary/5 via-background to-background shadow-md dark:from-primary/10 dark:via-background dark:to-background",
          isComponentPage ? "mb-4 md:mb-8" : "mb-8 md:mb-16"
        )}>
          <div className="space-y-4 p-4 md:space-y-6 md:p-8">
            <CardHeader className="relative p-0">
              <div className="absolute -right-1 -top-1 md:-right-2 md:-top-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                  className="h-7 w-7 md:h-8 md:w-8 rounded-full hover:bg-primary/10"
                >
                  <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
              <CardTitle className="text-2xl md:text-4xl font-bold tracking-tight">
                {doc.frontmatter.title}
              </CardTitle>
              {copied && (
                <div className="absolute -right-1 top-7 md:-right-2 md:top-8 animate-in fade-in slide-in-from-top-1 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
                  URL copied!
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-4 p-0">
              <CardDescription className="text-base md:text-lg leading-relaxed text-muted-foreground">
                {doc.frontmatter.description}
              </CardDescription>

              {(doc.frontmatter.image || doc.frontmatter.youtube) && (
                <div className="relative aspect-video w-full md:w-[280px] overflow-hidden rounded-lg border bg-muted">
                  {doc.frontmatter.image ? (
                    <Image
                      src={doc.frontmatter.image}
                      alt={doc.frontmatter.title}
                      fill
                      className="object-cover transition-all hover:scale-105"
                      priority
                    />
                  ) : doc.frontmatter.youtube && (
                    <iframe
                      src={`${doc.frontmatter.youtube}?autoplay=0&rel=0`}
                      title={doc.frontmatter.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  )}
                </div>
              )}

              {Array.isArray(doc.frontmatter.tags) && doc.frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {doc.frontmatter.tags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="secondary" 
                      className="text-xs md:text-sm transition-colors hover:bg-secondary/80"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </div>
        </Card>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <MDXProvider source={doc.source} />
        </div>
      </div>
    </DocsLayout>
  )
}

export async function getStaticProps({ params }) {
  try {
    const slug = params.slug.join('/')
    const doc = await getDocBySlug(slug)
    
    if (!doc || !doc.source) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        doc
      }
    }
  } catch (error) {
    console.error('Error loading doc:', error)
    return {
      notFound: true
    }
  }
}

export async function getStaticPaths() {
  const docs = await getAllDocs()
  
  return {
    paths: docs.map((doc) => ({
      params: {
        slug: doc.slug ? doc.slug.split('/') : []
      }
    })),
    fallback: false
  }
} 