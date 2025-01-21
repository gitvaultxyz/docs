import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export function TableOfContents({ className }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    // Reset state when pathname changes
    setHeadings([])
    setActiveId('')

    // Only select h2 and h3 headings
    const elements = Array.from(document.querySelectorAll('h2, h3'))
      .filter(element => element.id) // Only include headings with IDs
      .map((element) => ({
        id: element.id,
        text: element.textContent?.split('#')[0].trim() || '', // Remove any trailing anchor symbols
        level: Number(element.tagName.charAt(1))
      }))
    setHeadings(elements)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { 
        rootMargin: '-80px 0px -80% 0px',
        threshold: 1.0 
      }
    )

    elements.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // Cleanup function
    return () => {
      observer.disconnect() // Disconnect the observer
      setHeadings([]) // Clear headings
      setActiveId('') // Reset active ID
    }
  }, [pathname])

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
                key={id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={cn(
                  'line-clamp-1 transition-all duration-200 ease-in-out',
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
                    document.getElementById(id)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    })
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