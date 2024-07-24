import { Controller, Get, Post, Delete, Param, Body, Put, UsePipes, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserSerializer, UpdateUserSerializer } from './user.serializer';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UUIDValidationPipe } from '../pipes/uuid-validation.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 200, description: 'User has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  create(@Body() createUserSerializer: CreateUserSerializer): Promise<User> {
    return this.userService.create(createUserSerializer);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Return user by ID.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UsePipes(new UUIDValidationPipe())
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UsePipes(new UUIDValidationPipe())
  update(@Param('id') id: string, @Body() updateUserSerializer: UpdateUserSerializer) {
    return this.userService.update(id, updateUserSerializer);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User has been successfully deleted.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UsePipes(new UUIDValidationPipe())
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
