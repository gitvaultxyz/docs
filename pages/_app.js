import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from '../components/theme-provider'
import { cn } from '../lib/utils'
import '../styles/globals.css'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
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
