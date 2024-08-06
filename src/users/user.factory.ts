import { UserService } from './user.service';
import { CreateUserSerializer } from './user.serializer';
import { v4 as uuid } from 'uuid';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export async function createUser(userService: UserService): Promise<CreateUserSerializer> {
  const username = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    length: 2,
  });
  const user = {
    id: uuid(),
    username: username,
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: new Date().toISOString(),
    tasks: [],
  };

  await userService.create(user);
  return user;
}
