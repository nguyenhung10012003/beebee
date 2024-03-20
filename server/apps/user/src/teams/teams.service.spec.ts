import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { DataSource } from 'typeorm';
import { CreateTeamInput } from '../dto/create-team.input';
import { UpdateTeamInput } from '../dto/update-team.input';

describe('TeamsService', () => {
  let service: TeamsService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: DataSource,
          useValue: {
            getRepository: jest.fn(() => ({
              findOneBy: jest.fn().mockReturnThis(),
              save: jest.fn().mockReturnThis(),
              createQueryBuilder: jest.fn(() => ({
                where: jest.fn().mockReturnThis(),
                getOne: jest.fn().mockReturnThis(),
                getMany: jest.fn().mockReturnThis(),
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                add: jest.fn().mockReturnThis(),
                remove: jest.fn().mockReturnThis(),
              })),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a team', async () => {
      const teamInput: CreateTeamInput = {
        name: 'Test Team',
        leader: '1',
      };

      const result = await service.create(teamInput);
      expect(result).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return all teams', async () => {
      const result = await service.findAll();

      expect(result).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should return a team by id', async () => {

      const result = await service.findOne('1');

      expect(result).toBeDefined();
    });
  });

  describe('findByName', () => {
    it('should return teams by name', async () => {
      const result = await service.findByName('Test Team');

      expect(result).toBeDefined();
    });
  });

  describe('findByLeaderId', () => {
    it('should return teams by leader id', async () => {

      const result = await service.findByLeaderId('1');

      expect(result).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update a team', async () => {


      const updateTeamInput: UpdateTeamInput = {
        id: '1',
        name: 'Updated Test Team',
        active: true,
      };

      const result = await service.update('1', updateTeamInput);

      expect(result).toBeDefined();
    });
  });

  describe('findAllMembers', () => {
    it('should return all members of a team', async () => {

      const result = await service.findAllMembers('1');

      expect(result).toBeDefined();
    });
  });

  describe('addMembers', () => {
    it('should add members to a team', async () => {
      const userIds = ['2', '3'];

      const result = await service.addMembers('1', userIds);

      expect(result).toBeDefined();
    });
  });

  describe('removeMembers', () => {
    it('should remove members from a team', async () => {
      const userIds = ['2', '3'];

      const result = await service.removeMembers('1', userIds);

      expect(result).toBeDefined();
    });
  });
});