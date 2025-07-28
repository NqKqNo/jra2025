"use server"

import { cookies } from "next/headers"

export async function authenticate(prevState: { message: string; success: boolean }, formData: FormData) {
  const password = formData.get("password") as string

  if (password === process.env.EARTH_ACTION_PASSWORD) {
    cookies().set("earth_action_password", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1日有効
      path: "/",
    })
    return { message: "認証成功", success: true }
  } else {
    return { message: "パスワードが間違っています", success: false }
  }
}
