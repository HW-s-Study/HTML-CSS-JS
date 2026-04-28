import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ description: '과목 이름', example: '웹 프로그래밍' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: '시작일', example: '2026-03-02' })
  @IsNotEmpty()
  @IsString()
  startDate: string;

  @ApiProperty({ description: '종료일', example: '2026-06-20' })
  @IsNotEmpty()
  @IsString()
  endDate: string;

  @ApiProperty({ description: '수업 시간', example: '월/수 10:00-11:30' })
  @IsNotEmpty()
  @IsString()
  schedule: string;

  @ApiProperty({ description: '수강 가능 인원', example: 40 })
  @IsInt()
  @Min(1)
  maxStudents: number;

  @ApiProperty({ description: '강의실', example: '공학관 201호' })
  @IsNotEmpty()
  @IsString()
  classroom: string;

  @ApiPropertyOptional({ description: '수업 소개', example: 'HTML, CSS, JavaScript 기초부터 React까지 배우는 수업입니다.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: '강사 ID', example: 1 })
  @IsInt()
  instructorId: number;
}
