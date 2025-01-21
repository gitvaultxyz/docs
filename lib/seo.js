import { docsConfig } from '@/config/docs'

export function getPageSEO({ title, description, path, image }) {
  const url = `${docsConfig.meta.openGraph.url}${path}`
  
  return {
    title,
    description,
    openGraph: {
      url,
      image,
    },
    twitter: {
      image,
    },
  }
}

export function getDocsSEO({ title, description, path, image }) {
  const seo = getPageSEO({ title, description, path, image })
  
  return {
    ...seo,
    keywords: ['docs', 'documentation', title?.toLowerCase()].filter(Boolean),
  }
}

export function getBlogSEO({ title, description, path, image, tags = [] }) {
  const seo = getPageSEO({ title, description, path, image })
  
  return {
    ...seo,
    keywords: ['blog', ...tags],
    openGraph: {
      ...seo.openGraph,
      type: 'article',
    },
  }
} 