import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/posts"

export async function GET() {
  const posts = getAllPosts()
  
  const markdown = `# Blog Posts

${posts.map(post => `- [${post.title}](/blog/${post.slug}) - *${post.date}*
  ${post.excerpt}`).join("\n\n")}`

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
