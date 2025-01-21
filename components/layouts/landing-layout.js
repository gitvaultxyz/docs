import { DocsHeader } from '../docs/header'
import { Footer } from '../footer'

export function LandingLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
} 