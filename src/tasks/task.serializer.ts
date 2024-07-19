import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './entities/task.entity';

export class CreateTaskSerializer {
  @ApiProperty({ example: 'Lorem ipsum' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Lorem ipsum dolor sit amet' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @ApiProperty({ example: '3fcd40d9-0bd1-4b33-8488-c88b08ce0d60' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class UpdateTaskSerializer {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: TaskStatus, default: TaskStatus.TODO })
  status?: TaskStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  userId?: string;
}
