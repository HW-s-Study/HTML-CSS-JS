import { Pool } from "pg";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// JS 드라라이버 생성
const pool = new Pool({connectionString: process.env.DATABASE_URL});
// 드라이버 어댑터로 감싸기
const adapter = new PrismaPg(pool);
// 클라이언트 싱글톤 생성 함수
const prismaClientSingleton = () => {
  return new PrismaClient({ 
    adapter,
    log: ['query', 'info', 'warn', 'error'], // 개발 시 로그 확인용
  });
};

// 전역 객체에 prisma 타입 선언
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// 이미 존재하면 재사용, 없으면 생성
export const prisma = globalThis.prisma ?? prismaClientSingleton();

// 프로덕션이면 필요 없음
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;