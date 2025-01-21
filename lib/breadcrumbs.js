import { docsConfig } from "../config/docs"

export function getBreadcrumbs(path) {
  // Remove trailing slash and split path
  const segments = path.replace(/\/$/, "").split("/").filter(Boolean)
  const breadcrumbs = []
  let currentPath = ""

  // Build breadcrumbs array
  segments.forEach((segment) => {
    currentPath += `/${segment}`
    
    // Find matching item in sidebar config
    const matchingItem = findItemInSidebar(currentPath)
    if (matchingItem) {
      breadcrumbs.push({
        title: matchingItem.title,
        href: matchingItem.href,
      })
    }
  })

  return breadcrumbs
}

function findItemInSidebar(path) {
  for (const group of docsConfig.sidebar?.groups || []) {
    const item = group.items.find(item => item.href === path)
    if (item) return item
  }
  return null
} 