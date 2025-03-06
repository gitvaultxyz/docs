import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export function TableOfContents({ className }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')
  const pathname = usePathname()

  // Memoized function to get headings
  const getHeadings = useCallback(() => {
    try {
      const elements = Array.from(document.querySelectorAll('h2, h3'))
        .filter(element => {
          // Only include headings with IDs and visible text
          return element.id && element.textContent?.trim()
        })
        .map((element) => ({
          id: element.id,
          text: element.textContent?.split('#')[0].trim() || '',
          level: Number(element.tagName.charAt(1)),
          element // Store reference to the element
        }))
      return elements
    } catch (error) {
      console.error('Error getting headings:', error)
      return []
    }
  }, [])

  // Update headings when pathname changes
  useEffect(() => {
    const updateHeadings = () => {
      // Wait for content to be rendered
      setTimeout(() => {
        const newHeadings = getHeadings()
        setHeadings(newHeadings)
      }, 100)
    }

    // Reset state
    setHeadings([])
    setActiveId('')

    // Initial update
    updateHeadings()

    // Update headings when content changes
    const observer = new MutationObserver(() => {
      updateHeadings()
    })

    // Observe changes in the main content area
    const contentArea = document.querySelector('main')
    if (contentArea) {
      observer.observe(contentArea, {
        childList: true,
        subtree: true
      })
    }

    return () => {
      observer.disconnect()
      setHeadings([])
      setActiveId('')
    }
  }, [pathname, getHeadings])

  // Handle intersection observer
  useEffect(() => {
    if (headings.length === 0) return

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-80px 0px -80% 0px',
      threshold: [0.1, 1.0] // Observe at 10% and 100% visibility
    })

    // Observe all headings
    headings.forEach(({ element }) => {
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  // Don't render if no headings
  if (headings.length === 0) {
    return null
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("relative py-6 hidden xl:block", className)}
    >
      <div className="sticky top-16">
        <motion.h4 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-sm font-medium text-[#292929] dark:text-white"
        >
          On This Page
        </motion.h4>
        <nav className="relative">
          <motion.ul 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3 text-sm"
          >
            {headings.map(({ id, text, level }, index) => (
              <motion.li
                key={`${id}-${index}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={cn(
                  'line-clamp-2 transition-all duration-200 ease-in-out',
                  level === 3 && 'ml-4',
                  activeId === id
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <a
                  href={`#${id}`}
                  className={cn(
                    'inline-block transition-colors duration-200',
                    activeId === id && 'font-medium'
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(id)
                    if (element) {
                      const offset = 80 // Adjust based on your header height
                      const elementPosition = element.getBoundingClientRect().top
                      const offsetPosition = elementPosition + window.pageYOffset - offset
                      
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      })
                    }
                  }}
                >
                  {text}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </motion.div>
  )
} 