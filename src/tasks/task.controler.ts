import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CreateTaskSerializer, UpdateTaskSerializer } from './task.serializer';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UUIDValidationPipe } from '../pipes/uuid-validation.pipe';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 200, description: 'Task has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  create(@Body() createTaskSerializer: CreateTaskSerializer) {
    return this.taskService.create(createTaskSerializer);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks.' })
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Task>> {
    return this.taskService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({ status: 200, description: 'Return task by ID.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @UsePipes(new UUIDValidationPipe())
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update task by ID' })
  @ApiResponse({ status: 200, description: 'Task has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UsePipes(new UUIDValidationPipe())
  update(@Param('id') id: string, @Body() updateTaskSerializer: UpdateTaskSerializer): Promise<Task> {
    return this.taskService.update(id, updateTaskSerializer);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task has been successfully deleted.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UsePipes(new UUIDValidationPipe())
  delete(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(id);
  }
}
