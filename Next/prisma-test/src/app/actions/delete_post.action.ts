"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function deletePost(
  prevState: unknown,
  formData: FormData
) {
  try {
    const postId = Number(formData.get("postId") as string);
    const password = formData.get("password") as string;

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return { status: false, message: "존재하지 않는 게시글입니다." };
    }
    if (post.password !== password) {
      return { status: false, message: "비밀번호가 일치하지 않습니다." };
    }
    await prisma.post.delete({ where: { id: postId } });
    revalidatePath("/");
  } catch (e) {
    return { status: false, message: `게시글 삭제에 실패했습니다. ${e}` };
  }

  redirect("/");
}
