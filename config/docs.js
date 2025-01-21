export const docsConfig = {
  // Site metadata
  site: {
    title: 'GitVault',
    description: 'Add superpowers to your GitHub codebase with censorship-resistant repository backups',
    favicon: '/favicon.ico',
    logo: {
      light: '/gitvault-dark.png',
      dark: '/gitvault-light.png',
      height: 24,
      width: 24,
    },
    onThisPage: true,
  },

  // Theme configuration
  theme: {
    colors: {
      background: '#E8E8EA',
      text: '#292929',
      border: '#FFFFFF',
      primary: '#0070f3',
      dark: {
        background: '#1A1A1A',
        text: '#FFFFFF',
        border: '#333333'
      }
    },
    typography: {
      fontFamily: {
        sans: 'Inter, sans-serif',
        mono: 'JetBrains Mono, monospace',
        heading: 'Cal Sans, sans-serif'
      },
      fontSize: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.5rem',
        base: '1rem'
      }
    }
  },

  // Navigation configuration
  navigation: {
    links: [
      {
        title: "Documentation",
        href: "/introduction",
      },
      {
        title: "GitHub",
        href: "https://github.com/yourusername/docs",
        external: true,
      },
    ],
  },

  // Sidebar configuration
  sidebar: {
    groups: [
      {
        title: "Getting Started",
        items: [
          {
            title: "Introduction",
            href: "/introduction",
            icon: "book",
          },
          {
            title: "Installation",
            href: "/installation",
            icon: "download",
          },
          {
            title: "Configuration",
            href: "/configuration",
            icon: "settings",
          },
          {
            title: "Customization",
            href: "/customization",
            icon: "paintbrush",
          },
        ],
      },
      {
        title: "Features",
        items: [
          {
            title: "MDX Support",
            href: "/features/mdx",
            icon: "fileText",
          },
          {
            title: "Navigation",
            href: "/features/navigation",
            icon: "menu",
          },
          {
            title: "Components",
            href: "/features/components",
            icon: "component",
          },
          {
            title: "Theming",
            href: "/features/theming",
            icon: "palette",
          },
          {
            title: "Code Blocks",
            href: "/features/code-blocks",
            icon: "code",
          },
          {
            title: "Callouts",
            href: "/features/callouts",
            icon: "alertCircle",
          },
          {
            title: "Search",
            href: "/features/search",
            icon: "search",
          },
        ],
      },
      {
        title: "Guides",
        items: [
          {
            title: "Theming",
            href: "/guides/theming",
            icon: "brush",
          },
        ],
      },
      {
        title: "Components",
        items: [
          {
            title: "Overview",
            href: "/components",
            icon: "grid",
          },
        ],
      },
    ],
  },

  // Layout configuration
  layout: {
    sidebar: {
      width: '240px',
      mobileBreakpoint: 'md',
      collapsible: true
    },
    tableOfContents: {
      width: {
        default: '200px',
        wide: '260px'
      },
      breakpoint: 'xl'
    },
    container: {
      maxWidth: '90rem',
      padding: {
        mobile: '1rem',
        desktop: '2rem'
      }
    },
    header: {
      height: '3.5rem',
      sticky: true
    },
    grid: {
      gap: '1rem'
    }
  },

  // Component styling
  components: {
    buttons: {
      variants: {
        default: {
          background: 'primary',
          text: 'white',
          hover: { opacity: 0.9 }
        },
        outline: {
          border: '1px solid',
          hover: { background: 'primary' }
        }
      },
      sizes: {
        sm: { height: '2rem', padding: '0.5rem 1rem' },
        default: { height: '2.5rem', padding: '0.75rem 1.5rem' },
        lg: { height: '3rem', padding: '1rem 2rem' },
        icon: { size: '2rem' }
      }
    },
    cards: {
      borderRadius: '0.5rem',
      borderWidth: '4px',
      padding: '1.5rem',
      hover: {
        transform: 'scale(1.02)',
        transition: 'all 0.2s ease-in-out'
      }
    },
    icons: {
      sizes: {
        sm: '1rem',
        default: '1.5rem',
        lg: '2rem'
      }
    }
  },

  // Animation configuration
  animations: {
    transitions: {
      default: '0.3s ease-in-out',
      fast: '0.15s ease-in-out',
      slow: '0.5s ease-in-out'
    },
    hover: {
      scale: 1.02,
      duration: '0.2s'
    }
  },

  // Main navigation items
  mainNav: [
    {
      title: 'About',
      href: 'https://gitvault.xyz/about',
    },
    {
      title: 'Discord',
      href: '/components/alert',
    },
    {
      title: 'Homepage',
      href: '/features/mdx',
    },
  ],

  // Landing page configuration
  landing: {
    hero: {
      title: "GitVault - Developer Documentation",
      description: "Add superpowers to your GitHub codebase with censorship-resistant & automated repository backups. Defend against censorship!",
      buttons: [
        {
          text: "Start Learning",
          href: "/introduction",
          variant: "default"
        },
        {
          text: "Sign In",
          href: "https://github.com/yourusername/docs",
          variant: "outline",
          icon: "github"
        }
      ]
    },
    bentoGrid: {
      items: [
        {
          type: "image",
          title: "What is DeDocs?",
          image: "/card1.png",
          href: "/introduction"
        },
        {
          type: "video",
          title: "Documentation Framework Demo",
          videoUrl: "https://www.youtube.com/embed/",
          href: "/features"
        },
        {
          type: "image",
          title: "How to write using MDX?",
          image: "/card2.png",
          href: "/mdx"
        },
        {
          type: "image",
          title: "What can I customize?",
          image: "/card3.png",
          href: "/features/search"
        },
        {
            type: "image",
            title: "How to contribute?",
            image: "/card4.png",
            href: "/features/search"
          },
          {
              type: "image",
              title: "Is it free?",
              image: "/card5.png",
              href: "/features/search"
            }
      ]
    }
  },

  // Footer configuration
  footer: {
    credits: 'Open Source ♡ @hackyguru',
    links: [
      {
        title: 'License',
        href: '/license',
      },
      {
        title: 'Privacy',
        href: '/privacy',
      },
      {
        title: 'Terms',
        href: '/terms',
      },
    ],
    social: [
      {
        title: 'GitHub',
        href: 'https://github.com/yourusername/docs',
        icon: 'github',
      },
      {
        title: 'Twitter',
        href: 'https://twitter.com/yourusername',
        icon: 'twitter',
      },
      {
        title: 'Discord',
        href: 'https://discord.gg/yourinvite',
        icon: 'discord',
      },
    ],
  }
} 