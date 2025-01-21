import Link from "next/link"
import { docsConfig } from "../config/docs"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function Footer({ className }) {
  return (
    <footer className={cn("w-full border-t bg-background", className)}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Credits */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              {docsConfig.footer.credits}
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {docsConfig.footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {docsConfig.footer.social.map((link) => {
              const Icon = Icons[link.icon]
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.title}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  <span className="sr-only">{link.title}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
} 