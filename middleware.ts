import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const password = request.cookies.get("earth_action_password")?.value
  const targetPath = "/earth-action"

  // /earth-action ページへのアクセスをチェック
  if (request.nextUrl.pathname === targetPath) {
    // パスワードが設定されていない、または間違っている場合、ログインページへリダイレクト
    if (password !== process.env.EARTH_ACTION_PASSWORD) {
      const loginUrl = new URL("/login", request.url)
      // リダイレクト後に元のページに戻れるように、元のパスをクエリパラメータとして渡す
      loginUrl.searchParams.set("redirect", targetPath)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// ミドルウェアを適用するパスを設定
export const config = {
  matcher: ["/earth-action"], // /earth-action ページのみに適用
}
