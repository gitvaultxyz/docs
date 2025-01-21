import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Icons } from '../components/icons'
import { LandingLayout } from '../components/layouts/landing-layout'
import { cn } from '../lib/utils'
import { docsConfig } from '../config/docs'

export default function LandingPage() {
  const { landing } = docsConfig
  console.log('Landing config:', landing?.hero?.buttons) // Add debug log

  const getIcon = (icon) => {
    const Icon = Icons[icon]
    return Icon ? <Icon className="mr-2 h-5 w-5" /> : null
  }

  return (
    <div className="container mx-auto max-w-[1200px] px-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-[#292929] dark:text-white text-3xl font-bold sm:text-5xl md:text-6xl lg:text-4xl">
            {landing?.hero?.title}
          </h1>
          {landing?.hero?.description && (
            <p className="text-lg text-[#292929] dark:text-white/80 max-w-[42rem]">
              {landing.hero.description}
            </p>
          )}
          <div className="flex gap-4 mt-4">
            {landing?.hero?.buttons?.map((button, index) => (
              <Link key={index} href={button.href}>
                <Button 
                  variant={button.variant || "default"} 
                  size="lg" 
                  className={cn(
                    "h-12 px-8",
                    button.variant === "outline" ? "text-[#292929] dark:text-white hover:text-[#292929] dark:hover:text-white" : "text-white dark:text-black"
                  )}
                >
                  {button.icon && getIcon(button.icon)}
                  {button.text}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-8">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[240px]">
          {landing.bentoGrid.items.map((item, index) => (
            <Card 
              key={index}
              className={cn(
                "relative overflow-hidden border-4 border-white dark:border-neutral-800 bg-[#eaeaea] dark:bg-neutral-900 group",
                item.type === "video" ? "md:col-span-2 lg:col-span-4 md:row-span-2" : "md:col-span-2 lg:col-span-2"
              )}
            >
              <div className="relative w-full h-full">
                {item.type === "image" ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <iframe
                    src={item.videoUrl}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={item.title}
                    loading="lazy"
                  />
                )}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-white dark:bg-neutral-800 rounded-full py-2 px-4">
                    <p className="text-sm font-medium text-[#292929] dark:text-white">{item.title}</p>
                  </div>
                  <Link href={item.href}>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="rounded-full bg-white dark:bg-neutral-800 h-8 w-8 text-[#292929] dark:text-white"
                    >
                      <Icons.arrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

LandingPage.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>
} 