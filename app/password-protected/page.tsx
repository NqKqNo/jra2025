"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PasswordProtectedPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password === "jra2025") {
      router.push("/") // ホームページにリダイレクト
    } else {
      setError("パスワードが正しくありません。もう一度お試しください。")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">アクセスが必要です</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-center text-gray-600">このページにアクセスするにはパスワードを入力してください。</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                id="password"
                type="password"
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("") // 入力変更時にエラーをクリア
                }}
                required
              />
            </div>
            {error && <p className="text-center text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              送信
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
