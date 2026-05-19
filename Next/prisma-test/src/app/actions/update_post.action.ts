"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function updatePost(
  prevState: unknown,
  formData: FormData
) {
  let postId = 0;

  try {
    postId = Number(formData.get("postId") as string);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const password = formData.get("password") as string;

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return { status: false, message: "존재하지 않는 게시글입니다." };
    }
    if (post.password !== password) {
      return { status: false, message: "비밀번호가 일치하지 않습니다." };
    }

    await prisma.post.update({
      where: { id: postId },
      data: { title, body },
    });

    revalidatePath("/");
    revalidatePath(`/posts/${postId}`);
  } catch (e) {
    return { status: false, message: `게시글 수정에 실패했습니다. ${e}` };
  }

  redirect(`/posts/${postId}`);
}
