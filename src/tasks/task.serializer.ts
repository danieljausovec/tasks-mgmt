import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './entities/task.entity';
import { Exclude } from 'class-transformer';

export class CreateTaskSerializer {
  @Exclude()
  id: string;

  @ApiProperty({ example: 'Lorem ipsum' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Lorem ipsum dolor sit amet' })
  @IsString()
  @IsOptional()
  description?: string;

  @Exclude()
  status: TaskStatus;

  @ApiProperty({ example: '3fcd40d9-0bd1-4b33-8488-c88b08ce0d60' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Exclude()
  createdTimestamp: string;

  @Exclude()
  updatedTimestamp: string;

  constructor(partial: Partial<CreateTaskSerializer>) {
    Object.assign(this, partial);
  }
}

export class UpdateTaskSerializer extends PartialType(CreateTaskSerializer) {}
