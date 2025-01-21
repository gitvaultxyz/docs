"use client"

import { Highlight, themes } from 'prism-react-renderer'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getHeadingId } from '@/lib/utils'
import { useState, useEffect } from 'react'

const Code = ({ children, className }) => {
  // Check if this is inline code or a code block
  const isInlineCode = !children?.toString().includes('\n')
  
  if (isInlineCode) {
    return (
      <code className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm', className)}>
        {children}
      </code>
    )
  }

  const language = className?.replace(/language-/, '') || 'javascript'
  const code = children?.trim() || ''

  return (
    <Highlight theme={themes.vsDark} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="group relative">
          <pre className={cn('my-3 overflow-x-auto rounded-lg bg-zinc-950 p-4', className)} style={style}>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="opacity-0 group-hover:opacity-100 absolute right-2 top-2 rounded bg-zinc-700 px-2 py-1 text-xs text-white hover:bg-zinc-600"
          >
            Copy
          </button>
        </div>
      )}
    </Highlight>
  )
}

export const components = {
  pre: ({ className, ...props }) => (
    <div className={cn('rounded-lg', className)}>
      <pre {...props} />
    </div>
  ),
  code: Code,
  h1: ({ className, children, ...props }) => {
    return (
      <h1
        className={cn('mt-8 scroll-m-20 text-4xl font-bold', className)}
        {...props}
      >
        {children}
      </h1>
    )
  },
  h2: ({ className, children, ...props }) => {
    const id = getHeadingId(children)
    return (
      <h2
        id={id}
        className={cn('mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0', className)}
        {...props}
      >
        {children}
      </h2>
    )
  },
  h3: ({ className, children, ...props }) => {
    const id = getHeadingId(children)
    return (
      <h3
        id={id}
        className={cn('mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)}
        {...props}
      >
        {children}
      </h3>
    )
  },
  h4: ({ className, children, ...props }) => (
    <h4
      className={cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)}
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ className, children, ...props }) => {
    return (
      <p
        className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
        {...props}
      >
        {children}
      </p>
    )
  },
  ul: ({ className, children, ...props }) => (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props}>
      {children}
    </ul>
  ),
  ol: ({ className, children, ...props }) => (
    <ol className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)} {...props}>
      {children}
    </ol>
  ),
  li: ({ className, children, ...props }) => (
    <li className={cn('mt-2', className)} {...props}>
      {children}
    </li>
  ),
  blockquote: ({ className, children, ...props }) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: ({ ...props }) => <hr className="my-8" {...props} />,
  a: ({ className, children, ...props }) => (
    <a
      className={cn('font-medium underline underline-offset-4', className)}
      {...props}
    >
      {children}
    </a>
  ),
  table: ({ className, children, ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props}>
        {children}
      </table>
    </div>
  ),
  tr: ({ className, children, ...props }) => (
    <tr
      className={cn('m-0 border-t p-0 even:bg-muted', className)}
      {...props}
    >
      {children}
    </tr>
  ),
  th: ({ className, children, ...props }) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ className, children, ...props }) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    >
      {children}
    </td>
  ),
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} 