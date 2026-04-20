import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.author.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const author = await this.prisma.author.findUnique({ where: { id } });
    if (!author) throw new NotFoundException(`Author #${id} not found`);
    return author;
  }
}
