import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { InstructorModule } from './instructor/instructor.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [PrismaModule, InstructorModule, CourseModule],
})
export class AppModule {}
