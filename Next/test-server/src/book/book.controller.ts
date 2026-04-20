import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiQuery({ name: 'authorId', required: false, type: Number })
  findAll(@Query('authorId') authorId?: string) {
    return this.bookService.findAll(authorId ? Number(authorId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }
}
