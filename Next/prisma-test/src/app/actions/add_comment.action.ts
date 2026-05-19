"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function addComment(
  prevState: unknown,
  formData: FormData
) {
  try {
    const postId = formData.get("postId") as string;
    const comment = formData.get("comment") as string;
    const password = formData.get("password") as string;

    await prisma.comment.create({
      data: {
        postId: Number(postId),
        comment,
        password,
      },
    });
    revalidatePath(`/posts/${postId}`);
    return { status: true, message: "댓글이 등록되었습니다" };
  } catch (e) {
    return { status: false, message: `댓글 등록에 실패했습니다. ${e}` };
  }
}
