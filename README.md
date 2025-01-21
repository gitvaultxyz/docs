# Modern Documentation Framework

A beautiful, feature-rich documentation framework built with Next.js, MDX, and Shadcn UI.

![Documentation Framework](public/og.png)

## Features

- 📝 **MDX Support** - Write content using MDX (Markdown + React components)
- 🎨 **Beautiful UI** - Modern and clean interface using Shadcn UI components
- 🌓 **Dark Mode** - Automatic dark mode with system preference support
- 🔍 **Full-text Search** - Built-in search functionality
- 📱 **Responsive** - Mobile-first design that works on all devices
- ⚡ **Fast** - Optimized for performance and fast page loads
- 🎯 **SEO Optimized** - Built-in SEO support with meta tags
- 📊 **Analytics Ready** - Easy integration with your analytics platform
- 🔧 **Customizable** - Highly configurable through a central config file

## Quick Start

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hackyguru/docs.git
cd docs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
docs/
├── components/     # React components
├── content/        # Documentation content (MDX)
│   ├── docs/       # Main documentation
│   ├── guides/     # Guides and tutorials
│   └── features/   # Feature documentation
├── config/         # Configuration files
├── lib/           # Utility functions
├── pages/         # Next.js pages
├── public/        # Static assets
└── styles/        # Global styles
```

## Writing Documentation

Add your documentation files in the `content` directory using MDX:

```mdx
---
title: Getting Started
description: Learn how to use the documentation framework
---

# Getting Started

Welcome to our documentation...
```

## Configuration

Customize your documentation site in `config/docs.js`:

```js
export const docsConfig = {
  site: {
    title: 'Your Documentation',
    description: 'Your documentation description',
  },
  // ... more configuration options
}
```

## Built-in Components

The framework includes several built-in components:

- `Alert` - For important notices and warnings
- `Card` - For grouping related content
- `Tabs` - For organizing content in tabs
- `Code` - For code snippets with syntax highlighting
- And many more...

## Customization

### Theme

Customize colors, typography, and other theme settings in `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Your colors
      },
    },
  },
}
```

### Components

Add or modify components in the `components` directory.

## Deployment

Deploy your documentation site to any platform that supports Next.js:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [AWS Amplify](https://aws.amazon.com/amplify/)

Example deployment to Vercel:

```bash
vercel
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📚 [Documentation](https://docs.hackyguru.com)
- 🐛 [Issue Tracker](https://github.com/hackyguru/docs/issues)
- 💬 [Community](https://github.com/hackyguru/docs/discussions)

## Acknowledgments

- [Next.js](https://nextjs.org)
- [Shadcn UI](https://ui.shadcn.com)
- [MDX](https://mdxjs.com)
- [Tailwind CSS](https://tailwindcss.com)

## Author

- Guru ([@hackyguru](https://github.com/hackyguru))

---

Built with ♥ by [Guru](https://github.com/hackyguru)
