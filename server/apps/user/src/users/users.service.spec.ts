import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DataSource } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { Role } from '../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let mockDataSource: any;

  beforeEach(async () => {
    mockDataSource = {
      getRepository: jest.fn().mockImplementation(() => ({
        createQueryBuilder: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        execute: jest.fn().mockReturnThis(),
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const input: CreateUserInput = {
      username: 'test',
      email: 'test@test.com',
      password: 'test',
    };
    const result = await service.create(input);
    expect(result).toBeDefined();
  });

  it('should find all users', async () => {
    const result = await service.findAll();
    expect(result).toBeDefined();
  });

  it('should find one user', async () => {
    const result = await service.findOne('1');
    expect(result).toBeDefined();
  });

  it('should find users by email', async () => {
    const result = await service.findByEmail('test@test.com');
    expect(result).toBeDefined();
  });

  it('should update a user', async () => {
    const input: UpdateUserInput = {
      id: '1',
      username: 'test',
      role: Role.ADMIN,
    };
    const result = await service.update('1', input);
    expect(result).toBeDefined();
  });
});