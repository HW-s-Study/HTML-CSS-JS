import * as path from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const DB_URL = `file:${path.resolve(__dirname, 'dev.db')}`;
const prisma = new PrismaClient({ adapter: new PrismaLibSql({ url: DB_URL }) });

async function main() {
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  const authors = await prisma.author.createManyAndReturn({
    data: [
      {
        name_kr: '조지 오웰',
        name: 'George Orwell',
        description:
          '영국의 소설가이자 수필가. 전체주의를 비판한 작품으로 유명하다.',
      },
      {
        name_kr: '프란츠 카프카',
        name: 'Franz Kafka',
        description: '체코 출신의 독일어 소설가. 부조리 문학의 선구자.',
      },
      {
        name_kr: '어니스트 헤밍웨이',
        name: 'Ernest Hemingway',
        description: '미국의 소설가. 간결한 문체와 남성적 주제로 유명하다.',
      },
      {
        name_kr: '가브리엘 가르시아 마르케스',
        name: 'Gabriel García Márquez',
        description: '콜롬비아의 소설가. 마술적 사실주의의 대표 작가.',
      },
      {
        name_kr: '도스토옙스키',
        name: 'Fyodor Dostoevsky',
        description: '러시아의 소설가. 심리 묘사와 철학적 주제로 유명하다.',
      },
    ],
  });

  const [orwell, kafka, hemingway, marquez, dostoevsky] = authors;

  await prisma.book.createMany({
    data: [
      {
        title_kr: '1984',
        title: 'Nineteen Eighty-Four',
        author_id: orwell.id,
        isbn: '9788937460777',
        publisher: '민음사',
        published_at: new Date('1949-06-08'),
      },
      {
        title_kr: '동물농장',
        title: 'Animal Farm',
        author_id: orwell.id,
        isbn: '9788937460784',
        publisher: '민음사',
        published_at: new Date('1945-08-17'),
      },
      {
        title_kr: '변신',
        title: 'Die Verwandlung',
        author_id: kafka.id,
        isbn: '9788937460791',
        publisher: '민음사',
        published_at: new Date('1915-10-15'),
      },
      {
        title_kr: '심판',
        title: 'Der Process',
        author_id: kafka.id,
        isbn: '9788937460807',
        publisher: '민음사',
        published_at: new Date('1925-04-26'),
      },
      {
        title_kr: '노인과 바다',
        title: 'The Old Man and the Sea',
        author_id: hemingway.id,
        isbn: '9788937460814',
        publisher: '민음사',
        published_at: new Date('1952-09-01'),
      },
      {
        title_kr: '무기여 잘 있거라',
        title: 'A Farewell to Arms',
        author_id: hemingway.id,
        isbn: '9788937460821',
        publisher: '민음사',
        published_at: new Date('1929-09-27'),
      },
      {
        title_kr: '백년의 고독',
        title: 'Cien años de soledad',
        author_id: marquez.id,
        isbn: '9788937460838',
        publisher: '민음사',
        published_at: new Date('1967-05-30'),
      },
      {
        title_kr: '죄와 벌',
        title: 'Prestuplenie i nakazanie',
        author_id: dostoevsky.id,
        isbn: '9788937460845',
        publisher: '민음사',
        published_at: new Date('1866-11-01'),
      },
      {
        title_kr: '카라마조프가의 형제들',
        title: 'Bratya Karamazovy',
        author_id: dostoevsky.id,
        isbn: '9788937460852',
        publisher: '민음사',
        published_at: new Date('1880-11-01'),
      },
    ],
  });

  console.log('Seed data inserted successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
