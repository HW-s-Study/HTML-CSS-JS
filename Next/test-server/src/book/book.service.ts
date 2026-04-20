import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(authorId?: number) {
    const books = await this.prisma.book.findMany({
      where: authorId ? { author_id: authorId } : undefined,
      include: { author: true },
      orderBy: { id: 'asc' },
    });

    return books.map((book) => ({
      id: book.id,
      title_kr: book.title_kr,
      title: book.title,
      author_id: book.author_id,
      author_name_kr: book.author.name_kr,
      author_name: book.author.name,
      isbn: book.isbn,
      publisher: book.publisher,
      published_at: book.published_at,
    }));
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!book) throw new NotFoundException(`Book #${id} not found`);

    return {
      id: book.id,
      title_kr: book.title_kr,
      title: book.title,
      author_id: book.author_id,
      author_name_kr: book.author.name_kr,
      author_name: book.author.name,
      isbn: book.isbn,
      publisher: book.publisher,
      published_at: book.published_at,
    };
  }
}
