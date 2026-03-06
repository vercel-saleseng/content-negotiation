import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the request is for a blog post
  const blogPostMatch = pathname.match(/^\/blog\/([^/]+)$/)
  
  if (blogPostMatch) {
    const slug = blogPostMatch[1]
    
    // Check if the slug ends with .md
    if (slug.endsWith(".md")) {
      const actualSlug = slug.replace(/\.md$/, "")
      const markdownUrl = new URL(`/api/blog/${actualSlug}/markdown`, request.url)
      return NextResponse.rewrite(markdownUrl)
    }
    
    // Check Accept header for text/markdown content negotiation
    const acceptHeader = request.headers.get("accept") || ""
    if (acceptHeader.includes("text/markdown")) {
      const markdownUrl = new URL(`/api/blog/${slug}/markdown`, request.url)
      return NextResponse.rewrite(markdownUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/blog/:path*"],
}
