import { Test, TestingModule } from '@nestjs/testing';
import { RoutesController } from './routes.controller';

describe('Routes Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RoutesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: RoutesController = module.get<RoutesController>(RoutesController);
    expect(controller).toBeDefined();
  });
});
