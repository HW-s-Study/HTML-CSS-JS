import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';

@ApiTags('Instructor (강사)')
@Controller('instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post()
  @ApiOperation({ summary: '강사 등록' })
  create(@Body() dto: CreateInstructorDto) {
    return this.instructorService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '강사 목록 조회' })
  findAll() {
    return this.instructorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '강사 상세 조회' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.instructorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '강사 정보 수정' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInstructorDto,
  ) {
    return this.instructorService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '강사 삭제' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.instructorService.remove(id);
  }
}
