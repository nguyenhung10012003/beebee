import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from '../entities';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByEmail: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserInput: CreateUserInput = {
      username: 'test',
      email: 'test@test.com',
      password: 'test',
    };

    expect(await resolver.createUser(createUserInput)).toBeDefined();
  });

  it('should find all users', async () => {
    const result: User[] = [/* your test data */];

    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await resolver.findAll()).toBe(result);
  });

  it('should find one user by id', async () => {
    const id = '1';
    expect(await resolver.findOne(id)).toBeDefined();
  });

  it('should find users by email', async () => {
    const email = 'test-email';
    const result: User[] = [/* your test data */];

    jest.spyOn(service, 'findByEmail').mockImplementation(async () => result);

    expect(await resolver.findByEmail(email)).toBe(result);
  });

  it('should update a user', async () => {
    const updateUserInput: UpdateUserInput = { id: '1', username: 'test-email', role: null };

    expect(await resolver.updateUser(updateUserInput)).toBeDefined();
  });
});