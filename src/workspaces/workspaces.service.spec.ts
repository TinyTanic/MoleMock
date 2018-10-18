import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesService } from './workspaces.service';

describe('WorkspacesService', () => {
  let service: WorkspacesService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspacesService],
    }).compile();
    service = module.get<WorkspacesService>(WorkspacesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
