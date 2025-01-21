import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Icons } from '../icons'

export function DocsSidebar({ items = [], className }) {
  const pathname = usePathname()

  return (
    <div className={cn("relative", className)}>
      <div className="space-y-4">
        {items.map((group, groupIndex) => (
          <div key={groupIndex} className="px-4">
            <h4 className="mb-1 text-sm font-semibold text-foreground">
              {group.title}
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon ? Icons[item.icon] : null
                return (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className={cn(
                      "flex w-full items-center rounded-md py-1.5 pl-2",
                      "transition-colors",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                  >
                    {Icon && (
                      <Icon className="mr-2 h-4 w-4" />
                    )}
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 