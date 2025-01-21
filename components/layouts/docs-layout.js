"use client"

import { usePathname } from 'next/navigation'
import { docsConfig } from '../../config/docs'
import { DocsSidebar } from '../docs/sidebar'
import { DocsHeader } from '../docs/header'
import { ScrollArea } from '../ui/scroll-area'
import { Breadcrumbs } from '../ui/breadcrumbs'
import { getBreadcrumbs } from '../../lib/breadcrumbs'
import { Separator } from '../ui/separator'
import { Footer } from '../footer'
import { TableOfContents } from '../TableOfContents'
import { PageTransition } from '../page-transition'
import { motion, AnimatePresence } from 'framer-motion'

export function DocsLayout({ children }) {
  const pathname = usePathname()
  const isRoot = pathname === '/'
  const breadcrumbs = isRoot ? [] : getBreadcrumbs(pathname)
  const showTableOfContents = !isRoot && docsConfig.site?.onThisPage !== false

  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader />
      <div className="flex-1">
        <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_200px] 2xl:grid-cols-[240px_minmax(0,1fr)_260px]">
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block"
          >
            <ScrollArea className="h-full py-6 px-4">
              <DocsSidebar items={docsConfig.sidebar?.groups || []} />
            </ScrollArea>
          </motion.aside>
          <motion.main 
            className="relative py-6 lg:gap-10 lg:px-8"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="mx-auto w-full min-w-0">
              {!isRoot && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col gap-4"
                >
                  <div className="sticky top-[3.75rem] z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="px-4 pb-4 md:px-8 md:pb-6">
                      <Breadcrumbs segments={breadcrumbs} />
                      <Separator className="bg-white dark:bg-border mt-4" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div className="overflow-x-auto">
                <PageTransition>
                  {children}
                </PageTransition>
              </div>
            </div>
          </motion.main>
          {showTableOfContents && (
            <TableOfContents key={pathname} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
} 