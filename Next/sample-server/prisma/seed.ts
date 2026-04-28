import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // 강사 시드 데이터
  const instructor1 = await prisma.instructor.upsert({
    where: { email: 'yhkim@university.ac.kr' },
    update: {},
    create: {
      name: '김영희',
      email: 'yhkim@university.ac.kr',
      officePhone: '02-1234-5678',
      officeLocation: '공학관 301호',
      profileImage: 'https://api.dicebear.com/9.x/initials/svg?seed=YHK',
    },
  });

  const instructor2 = await prisma.instructor.upsert({
    where: { email: 'cspark@university.ac.kr' },
    update: {},
    create: {
      name: '박철수',
      email: 'cspark@university.ac.kr',
      officePhone: '02-1234-5679',
      officeLocation: '공학관 405호',
      profileImage: 'https://api.dicebear.com/9.x/initials/svg?seed=CSP',
    },
  });

  const instructor3 = await prisma.instructor.upsert({
    where: { email: 'jhlee@university.ac.kr' },
    update: {},
    create: {
      name: '이정현',
      email: 'jhlee@university.ac.kr',
      officePhone: '02-1234-5680',
      officeLocation: '정보관 202호',
      profileImage: 'https://api.dicebear.com/9.x/initials/svg?seed=JHL',
    },
  });

  // 수업 시드 데이터
  const courseCount = await prisma.course.count();
  if (courseCount > 0) {
    console.log('Courses already seeded, skipping...');
    return;
  }

  await prisma.course.createMany({
    data: [
      {
        name: '웹 프로그래밍',
        startDate: '2026-03-02',
        endDate: '2026-06-20',
        schedule: '월/수 10:00-11:30',
        maxStudents: 40,
        classroom: '공학관 201호',
        description: 'HTML, CSS, JavaScript 기초부터 React까지 배우는 수업입니다.',
        instructorId: instructor1.id,
      },
      {
        name: '데이터베이스',
        startDate: '2026-03-02',
        endDate: '2026-06-20',
        schedule: '화/목 13:00-14:30',
        maxStudents: 35,
        classroom: '공학관 301호',
        description: 'SQL과 데이터 모델링의 기초를 학습합니다.',
        instructorId: instructor2.id,
      },
      {
        name: '알고리즘',
        startDate: '2026-03-02',
        endDate: '2026-06-20',
        schedule: '월/수/금 09:00-10:00',
        maxStudents: 30,
        classroom: '정보관 101호',
        description: '정렬, 탐색, 그래프 등 핵심 알고리즘을 다룹니다.',
        instructorId: instructor3.id,
      },
      {
        name: '모바일 앱 개발',
        startDate: '2026-03-02',
        endDate: '2026-06-20',
        schedule: '화/목 10:00-11:30',
        maxStudents: 35,
        classroom: '공학관 202호',
        description: 'React Native를 활용한 크로스 플랫폼 앱 개발을 학습합니다.',
        instructorId: instructor1.id,
      },
      {
        name: '컴퓨터 네트워크',
        startDate: '2026-09-01',
        endDate: '2026-12-18',
        schedule: '월/수 14:00-15:30',
        maxStudents: 45,
        classroom: '정보관 301호',
        description: 'TCP/IP, HTTP 등 네트워크 프로토콜의 원리를 학습합니다.',
        instructorId: instructor2.id,
      },
    ],
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
