"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteComment(
  prevState: unknown,
  formData: FormData
) {
  try {
    const postId = Number(formData.get("postId") as string);
    const commentId = Number(formData.get("commentId") as string);
    const password = formData.get("password") as string;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) {
      return { status: false, message: "존재하지 않는 댓글입니다." };
    }
    if (comment.password !== password) {
      return { status: false, message: "비밀번호가 일치하지 않습니다." };
    }
    await prisma.comment.delete({ where: { id: commentId } });
    revalidatePath(`/posts/${postId}`);
    return { status: true, message: "댓글이 삭제되었습니다" };
  } catch (e) {
    return { status: false, message: `댓글 삭제에 실패했습니다. ${e}` };
  }
}
