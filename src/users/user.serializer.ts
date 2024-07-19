import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUpdateUserSerializer {
  @ApiProperty({ example: 'johndoe' })
  @IsString()
  @IsNotEmpty()
  // TODO: Add only lowercase validator
  username: string;
}
