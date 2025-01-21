import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DocsSidebar } from './sidebar'
import { docsConfig } from '../../config/docs'
import { cn } from '@/lib/utils'

export function DocsHeader() {
  const { setTheme, theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isRoot = pathname === '/'

  const logoConfig = docsConfig.site?.logo || {
    light: '/gitvault-dark.png',  // Dark logo for light theme
    dark: '/gitvault-light.png',   // Light logo for dark theme
    width: 32,
    height: 32,
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to get the correct logo based on theme
  const getLogoSrc = () => {
    if (!mounted) return logoConfig.dark; // Return dark theme logo for initial render
    return theme === 'dark' ? logoConfig.dark : logoConfig.light;
  }

  const handleGetStarted = async (e) => {
    e.preventDefault()
    setIsTransitioning(true)
    await new Promise(resolve => setTimeout(resolve, 300)) // Wait for fade out
    router.push('/introduction')
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out",
      !isRoot && "border-b"
    )}>
      <div className={cn(
        "flex h-14 items-center justify-between px-4 md:px-8",
        isTransitioning && "opacity-0 transition-opacity duration-300"
      )}>
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pl-1 pr-0">
              <div className="px-7">
                <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                  <Image 
                    src={getLogoSrc()} 
                    alt={docsConfig.site?.title || 'Logo'} 
                    width={logoConfig.width} 
                    height={logoConfig.height} 
                  />
                </Link>
              </div>
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <DocsSidebar items={docsConfig.sidebar?.groups || []} />
              </ScrollArea>
            </SheetContent>
          </Sheet>

          {/* Logo and Nav Items */}
          <div className="flex items-center gap-6">
            {!isRoot && (
              <Link href="/" className="hidden md:flex items-center">
                <Image 
                  src={getLogoSrc()} 
                  alt={docsConfig.site?.title || 'Logo'} 
                  width={logoConfig.width} 
                  height={logoConfig.height} 
                />
              </Link>
            )}
            <nav className="hidden md:flex items-center gap-6">
              {docsConfig.mainNav?.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-foreground/80"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Center Logo for Landing Page */}
        {isRoot && (
          <div className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center",
            isTransitioning && "opacity-0"
          )}>
            <Link href="/" className="flex items-center justify-center">
              <Image 
                src={getLogoSrc()} 
                alt={docsConfig.site?.title || 'Logo'} 
                width={logoConfig.width + 8}
                height={logoConfig.height + 8}
                priority
                className="transition-transform duration-300 ease-in-out"
              />
            </Link>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="h-8 w-8 px-0"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {isRoot && (
            <Button 
              variant="default" 
              size="sm"
              onClick={handleGetStarted}
              className="transition-all duration-300 ease-in-out hover:scale-105"
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </header>
  )
} 