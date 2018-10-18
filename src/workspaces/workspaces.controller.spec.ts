import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesController } from './workspaces.controller';

describe('Workspaces Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [WorkspacesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: WorkspacesController = module.get<WorkspacesController>(WorkspacesController);
    expect(controller).toBeDefined();
  });
});
