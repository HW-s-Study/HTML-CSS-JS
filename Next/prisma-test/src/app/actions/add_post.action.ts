"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function addPost(prevState: unknown, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const password = formData.get("password") as string;
    const post = await prisma.post.create({
      data: {
        title,
        body,
        password,
      },
    });

    revalidatePath("/");

    return {
      status: true,
      message: `게시글 "${post.title}" 이 등록되었습니다`,
    };
  } catch (e) {
    return {
      status: false,
      message: `게시글 등록에 실패했습니다. ${e}`,
    };
  }
}
