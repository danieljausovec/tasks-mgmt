import { INestApplication } from '@nestjs/common';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { createUser } from './user.factory';
import { CreateUserSerializer } from './user.serializer';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { v4 as uuid } from 'uuid';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let user: CreateUserSerializer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = moduleFixture.get<UserService>(UserService);
    app = moduleFixture.createNestApplication();
    await app.init();

    user = await createUser(userService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should update the username field', async () => {
    // set new username
    const newUsername = uniqueNamesGenerator({
      dictionaries: [adjectives, animals, colors],
      length: 2,
    });
    // make request with new username
    const response = await request(app.getHttpServer()).put(`/users/${user.id}`).send({ username: newUsername });
    // check if status is 200
    expect(response.status).toBe(200);
    // check if username from response match the new one
    expect(response.body.username).toBe(newUsername);
  });
  it('should not update other fields', async () => {
    const newID = uuid();
    const response = await request(app.getHttpServer()).put(`/users/${user.id}`).send({ id: newID });
    expect(response.status).toBe(400);
  });
});
