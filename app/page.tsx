import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
            My Blog
          </h1>
          <p className="text-muted-foreground">
            Thoughts on development, technology, and life.
          </p>
        </header>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group border-b border-border pb-8 last:border-0"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <time className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="text-2xl font-semibold text-foreground mt-2 group-hover:text-primary/80 transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mt-2">{post.excerpt}</p>
                <span className="inline-block mt-3 text-sm font-medium text-foreground group-hover:underline">
                  Read more →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
