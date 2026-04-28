import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInstructorDto {
  @ApiProperty({ description: '강사 이름', example: '김영희' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: '이메일', example: 'yhkim@university.ac.kr' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: '사무실 전화번호', example: '02-1234-5678' })
  @IsOptional()
  @IsString()
  officePhone?: string;

  @ApiPropertyOptional({ description: '사무실 위치', example: '공학관 301호' })
  @IsOptional()
  @IsString()
  officeLocation?: string;

  @ApiPropertyOptional({ description: '프로필 사진 URL', example: 'https://example.com/photo.jpg' })
  @IsOptional()
  @IsString()
  profileImage?: string;
}
