import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function PageTransition({ children }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    if (pathname) {
      setIsTransitioning(true)
      const timeout = setTimeout(() => {
        setDisplayChildren(children)
        setIsTransitioning(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [pathname, children])

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        isTransitioning && "opacity-0 transform translate-y-4",
        !isTransitioning && "opacity-100 transform translate-y-0"
      )}
    >
      {displayChildren}
    </div>
  )
} 