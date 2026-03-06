import { NextResponse } from "next/server"
import { getPostBySlug, postToMarkdown } from "@/lib/posts"

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return new NextResponse("Post not found", { status: 404 })
  }

  const markdown = postToMarkdown(post)

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
