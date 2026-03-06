import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/posts"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          ← Back to all posts
        </Link>

        <header className="mb-8">
          <time className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mt-2">
            {post.title}
          </h1>
          <p className="text-muted-foreground mt-2">By {post.author}</p>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {post.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-2xl font-semibold mt-8 mb-4 text-foreground">
                  {paragraph.replace("## ", "")}
                </h2>
              )
            }
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">
                  {paragraph.replace("### ", "")}
                </h3>
              )
            }
            if (paragraph.startsWith("```")) {
              const lines = paragraph.split("\n")
              const code = lines.slice(1, -1).join("\n")
              return (
                <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                  <code className="text-sm font-mono text-foreground">{code}</code>
                </pre>
              )
            }
            if (paragraph.startsWith("1. ") || paragraph.startsWith("- ")) {
              const items = paragraph.split("\n")
              const isOrdered = paragraph.startsWith("1. ")
              const ListTag = isOrdered ? "ol" : "ul"
              return (
                <ListTag key={index} className={`my-4 ml-6 space-y-2 ${isOrdered ? "list-decimal" : "list-disc"}`}>
                  {items.map((item, i) => (
                    <li key={i} className="text-muted-foreground">
                      {item.replace(/^(\d+\.\s|-\s)/, "")}
                    </li>
                  ))}
                </ListTag>
              )
            }
            return (
              <p key={index} className="text-muted-foreground leading-relaxed my-4">
                {paragraph}
              </p>
            )
          })}
        </div>

        <footer className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Want the raw markdown?{" "}
            <Link href={`/blog/${post.slug}.md`} className="underline hover:text-foreground">
              View as markdown
            </Link>
          </p>
        </footer>
      </article>
    </main>
  )
}
