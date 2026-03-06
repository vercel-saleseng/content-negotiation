export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
}

export const posts: Post[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js, the React framework for production.",
    content: `Next.js is a powerful React framework that enables you to build full-stack web applications with ease.

## Why Next.js?

Next.js provides a great developer experience with features like:

- **Server-side rendering** - Improve SEO and initial page load times
- **Static site generation** - Pre-render pages at build time for maximum performance
- **API routes** - Build your backend API alongside your frontend
- **File-based routing** - Create routes by simply adding files to your project

## Getting Started

To create a new Next.js project, run:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will set up a new project with all the necessary dependencies and configuration.

## Conclusion

Next.js makes it easy to build fast, scalable web applications. Give it a try!`,
    date: "2026-03-01",
    author: "Jane Developer"
  },
  {
    slug: "understanding-typescript",
    title: "Understanding TypeScript",
    excerpt: "A deep dive into TypeScript and why it's become essential for modern JavaScript development.",
    content: `TypeScript has revolutionized how we write JavaScript applications by adding static type checking.

## What is TypeScript?

TypeScript is a superset of JavaScript that adds optional static typing. This means all valid JavaScript code is also valid TypeScript code.

## Key Benefits

1. **Type Safety** - Catch errors at compile time rather than runtime
2. **Better IDE Support** - Enhanced autocomplete and refactoring tools
3. **Self-Documenting Code** - Types serve as inline documentation
4. **Easier Refactoring** - Make changes confidently across large codebases

## Basic Example

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`
}
\`\`\`

## Conclusion

TypeScript is worth learning for any JavaScript developer looking to write more maintainable code.`,
    date: "2026-03-03",
    author: "John Coder"
  },
  {
    slug: "my-post",
    title: "My Personal Journey in Tech",
    excerpt: "Reflecting on my path as a developer and the lessons I've learned along the way.",
    content: `Every developer's journey is unique, and today I want to share mine with you.

## How It All Started

I wrote my first line of code when I was 15. It was a simple "Hello, World!" program in Python, but it sparked something in me.

## The Learning Curve

Learning to code isn't easy. There were many late nights debugging code, countless Stack Overflow searches, and moments of frustration.

### Tips for Beginners

- **Start small** - Don't try to build the next Facebook on day one
- **Be consistent** - Code a little every day
- **Build projects** - The best way to learn is by doing
- **Join communities** - Connect with other developers

## Where I Am Today

After years of learning and growing, I now work as a full-stack developer. The journey continues, and there's always more to learn.

## Final Thoughts

If you're just starting out, keep going. The effort is worth it.`,
    date: "2026-03-05",
    author: "Alex Writer"
  }
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug)
}

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function postToMarkdown(post: Post): string {
  return `# ${post.title}

*By ${post.author} on ${post.date}*

${post.content}`
}
