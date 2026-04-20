import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule, BookModule, AuthorModule],
  controllers: [AppController],
})
export class AppModule {}
