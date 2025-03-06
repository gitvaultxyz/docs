import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from '../components/theme-provider'
import { cn } from '../lib/utils'
import '../styles/globals.css'
import Head from 'next/head'
import { docsConfig } from '@/config/docs'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <title>{docsConfig.site.title}</title>
        <meta name="description" content={docsConfig.site.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={docsConfig.site.favicon} />
      </Head>
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.style.fontFamily};
        }
      `}</style>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          {getLayout(<Component {...pageProps} />)}
        </div>
      </ThemeProvider>
    </>
  )
}
