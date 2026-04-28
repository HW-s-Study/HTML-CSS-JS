import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';

@Injectable()
export class InstructorService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateInstructorDto) {
    return this.prisma.instructor.create({ data: dto });
  }

  findAll() {
    return this.prisma.instructor.findMany({
      select: { id: true, name: true, email: true, profileImage: true },
    });
  }

  async findOne(id: number) {
    const instructor = await this.prisma.instructor.findUnique({
      where: { id },
      include: { courses: true },
    });
    if (!instructor) throw new NotFoundException(`Instructor #${id} not found`);
    return instructor;
  }

  async update(id: number, dto: UpdateInstructorDto) {
    await this.findOne(id);
    return this.prisma.instructor.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.instructor.delete({ where: { id } });
  }
}
