"use client"

import { useActionState } from "react"
import { authenticate } from "./action"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirectPath = searchParams.get("redirect") || "/earth-action"

  const [state, formAction, isPending] = useActionState(authenticate, {
    message: "",
    success: false,
  })

  useEffect(() => {
    if (state.success) {
      router.push(redirectPath)
    }
  }, [state.success, router, redirectPath])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">アクセスパスワードを入力してください</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">
                パスワード
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="パスワード"
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "認証中..." : "ログイン"}
            </Button>
            {state.message && (
              <p className={`text-center text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
                {state.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
