import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskSerializer, UpdateTaskSerializer } from './task.serializer';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UserService } from '../users/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly userService: UserService,
  ) {}

  async create(createTaskSerializer: CreateTaskSerializer): Promise<Task> {
    const { userId, ...taskData } = createTaskSerializer;
    const user = await this.userService.findOne(userId);
    const task = this.taskRepository.create({ ...taskData, user });
    return await this.taskRepository.save(task);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Task>> {
    return paginate(query, this.taskRepository, {
      defaultLimit: 10,
      sortableColumns: ['title', 'status'],
      nullSort: 'last',
      defaultSortBy: [['title', 'ASC']],
      searchableColumns: ['id', 'title', 'status'],
      relations: ['user'],
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['user'] });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskSerializer: UpdateTaskSerializer): Promise<Task> {
    const { userId, ...taskData } = updateTaskSerializer;
    const user = await this.userService.findOne(userId);
    await this.taskRepository.update(id, { ...taskData, user });
    return this.taskRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
