import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export function Breadcrumbs({ segments = [], className }) {
  return (
    <nav 
      aria-label="Breadcrumbs" 
      className={cn(
        "flex items-center text-sm text-muted-foreground",
        className
      )}
    >
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            href="/"
            className="flex items-center hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {segments.map((segment, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            {index === segments.length - 1 ? (
              <span className="font-medium text-foreground">
                {segment.title}
              </span>
            ) : (
              <Link
                href={segment.href}
                className="hover:text-foreground"
              >
                {segment.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
} 