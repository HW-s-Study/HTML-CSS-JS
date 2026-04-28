import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCourseDto) {
    return this.prisma.course.create({
      data: dto,
      include: { instructor: true },
    });
  }

  async findAll() {
    const courses = await this.prisma.course.findMany({
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        schedule: true,
        instructor: { select: { name: true } },
      },
    });
    return courses.map(({ instructor, ...rest }) => ({
      ...rest,
      instructorName: instructor.name,
    }));
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        instructor: {
          select: { name: true, email: true, officeLocation: true },
        },
      },
    });
    if (!course) throw new NotFoundException(`Course #${id} not found`);
    return course;
  }

  async update(id: number, dto: UpdateCourseDto) {
    await this.findOne(id);
    return this.prisma.course.update({
      where: { id },
      data: dto,
      include: { instructor: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.course.delete({ where: { id } });
  }
}
