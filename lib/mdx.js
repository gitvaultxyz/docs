import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

// Helper to ensure directory exists
const ensureDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug],
  format: 'mdx'
}

export async function getDocBySlug(slug) {
  const contentDirectory = path.join(process.cwd(), 'content')
  ensureDirectory(contentDirectory)

  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    throw new Error(`No MDX file found for slug: ${slug}`)
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Ensure all frontmatter data is defined or null
  const frontmatter = {
    title: data.title || null,
    description: data.description || null,
    tags: Array.isArray(data.tags) ? data.tags : [],
    image: data.image || null,
    youtube: data.youtube || null,
    type: data.type || null
  }

  const source = await serialize(content, {
    ...mdxOptions,
    scope: {
      title: frontmatter.title,
      description: frontmatter.description,
      tags: frontmatter.tags,
      image: frontmatter.image,
      youtube: frontmatter.youtube,
      type: frontmatter.type
    },
    parseFrontmatter: false
  })

  return {
    source,
    frontmatter: {
      slug: realSlug,
      ...frontmatter
    }
  }
}

export async function getAllDocs() {
  const contentDirectory = path.join(process.cwd(), 'content')
  ensureDirectory(contentDirectory)

  const getAllFiles = (dir) => {
    const files = fs.readdirSync(dir)
    const allFiles = []

    files.forEach(file => {
      const fullPath = path.join(dir, file)
      if (fs.statSync(fullPath).isDirectory()) {
        allFiles.push(...getAllFiles(fullPath))
      } else if (file.endsWith('.mdx')) {
        const relativePath = path.relative(contentDirectory, fullPath)
        allFiles.push(relativePath)
      }
    })

    return allFiles
  }

  const files = getAllFiles(contentDirectory)
  const docs = files.map((file) => {
    const fullPath = path.join(contentDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    const slug = file.replace(/\.mdx$/, '')

    return {
      slug,
      title: data.title || null,
      description: data.description || null
    }
  })

  return docs
}

// Add getHighlighter configuration
export const getHighlighter = async () => {
  const shiki = await import('shiki')
  return await shiki.getHighlighter({
    theme: 'github-dark'
  })
} 