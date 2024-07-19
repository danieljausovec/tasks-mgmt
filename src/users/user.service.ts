import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUpdateUserSerializer } from './user.serializer';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUpdateUserSerializer: CreateUpdateUserSerializer): Promise<User> {
    const { username } = createUpdateUserSerializer;
    try {
      const user = this.userRepository.create(createUpdateUserSerializer);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('unique constraint')) {
        throw new BadRequestException(`Username ${username} is already taken`);
      }
      throw error;
    }
  }

  findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      defaultLimit: 10,
      sortableColumns: ['username'],
      nullSort: 'last',
      defaultSortBy: [['username', 'ASC']],
      searchableColumns: ['id', 'username'],
      relations: ['tasks'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['tasks'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, createUpdateUserSerializer: CreateUpdateUserSerializer): Promise<User> {
    await this.userRepository.update(id, createUpdateUserSerializer);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
