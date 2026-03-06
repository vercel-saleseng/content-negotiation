import { NextResponse } from "next/server"
import { getAllPosts, postToMarkdown } from "@/lib/posts"

export async function GET() {
  const posts = getAllPosts()
  
  const markdown = `# Blog Posts

${posts.map(post => `## [${post.title}](/blog/${post.slug})

*By ${post.author} on ${post.date}*

${post.excerpt}

---
`).join("\n")}

## Full Posts

${posts.map(post => postToMarkdown(post)).join("\n\n---\n\n")}`

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
