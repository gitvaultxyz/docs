"use client"

import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { docsConfig } from '@/config/docs'

export function SEO({
  title,
  description,
  keywords = [],
  openGraph = {},
  twitter = {},
}) {
  const pathname = usePathname()
  const meta = docsConfig.meta
  
  // Construct title
  const pageTitle = title
    ? meta.title.template.replace('%s', title)
    : meta.title.default

  // Merge descriptions
  const pageDescription = description || meta.description

  // Merge keywords
  const pageKeywords = [...meta.keywords, ...keywords].join(', ')

  // Merge OpenGraph data
  const og = {
    ...meta.openGraph,
    ...openGraph,
    url: `${meta.openGraph.url}${pathname}`,
    title: pageTitle,
    description: pageDescription,
  }

  // Merge Twitter data
  const tw = {
    ...meta.twitter,
    ...twitter,
    title: pageTitle,
    description: pageDescription,
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      
      {/* Author and Creator */}
      {meta.authors?.map((author, i) => (
        <meta key={i} name="author" content={author.name} />
      ))}
      {meta.creator && <meta name="creator" content={meta.creator} />}

      {/* Theme Color */}
      {meta.themeColor?.map((theme, i) => (
        <meta
          key={i}
          name="theme-color"
          content={theme.color}
          media={theme.media}
        />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content={og.type} />
      <meta property="og:site_name" content={og.siteName} />
      <meta property="og:url" content={og.url} />
      <meta property="og:title" content={og.title} />
      <meta property="og:description" content={og.description} />
      <meta property="og:locale" content={og.locale} />
      {og.image && <meta property="og:image" content={og.image} />}

      {/* Twitter */}
      <meta name="twitter:card" content={tw.card} />
      <meta name="twitter:site" content={tw.creator} />
      <meta name="twitter:creator" content={tw.creator} />
      <meta name="twitter:title" content={tw.title} />
      <meta name="twitter:description" content={tw.description} />
      {tw.image && <meta name="twitter:image" content={tw.image} />}

      {/* Icons */}
      <link rel="icon" href={meta.icons.icon} />
      <link rel="shortcut icon" href={meta.icons.shortcut} />
      <link rel="apple-touch-icon" href={meta.icons.apple} />

      {/* Canonical URL */}
      <link rel="canonical" href={og.url} />
    </Head>
  )
} 