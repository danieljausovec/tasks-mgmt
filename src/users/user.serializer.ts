import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Task } from '../tasks/entities/task.entity';

export class CreateUserSerializer {
  @Exclude()
  id: string;

  @ApiProperty({ example: 'johndoe' })
  @IsString()
  @IsNotEmpty()
  // TODO: Add only lowercase validator
  username: string;

  @Exclude()
  createdTimestamp: string;

  @Exclude()
  updatedTimestamp: string;

  @Exclude()
  tasks: Task[];

  constructor(partial: Partial<CreateUserSerializer>) {
    Object.assign(this, partial);
  }
}

export class UpdateUserSerializer extends PartialType(CreateUserSerializer) {}
