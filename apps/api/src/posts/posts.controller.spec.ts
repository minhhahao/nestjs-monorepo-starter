import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from '@app/modules/posts';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  it('should retrieve a post successfully with a valid id', async () => {
    // Arrange
    const id = '1';
    const expectedPost = { id: 1, title: 'Test Post' };
    jest.spyOn(postsService, 'findOne').mockResolvedValue(expectedPost as any);

    // Act
    const result = await postsController.findOne(id);

    // Assert
    expect(postsService.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(expectedPost);
  });

  it('should handle non-numeric id gracefully', async () => {
    // Arrange
    const id = 'abc';

    // Act
    const result = await postsController.findOne(id);

    // Assert
    expect(postsService.findOne).toHaveBeenCalledWith(NaN);
    expect(result).toBeUndefined();
  });

  it('should handle service errors gracefully', async () => {
    // Arrange
    const id = '1';
    jest
      .spyOn(postsService, 'findOne')
      .mockRejectedValue(new Error('Service Error'));

    // Act
    let error;
    try {
      await postsController.findOne(id);
    } catch (e) {
      error = e;
    }

    // Assert
    expect(postsService.findOne).toHaveBeenCalledWith(1);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Service Error');
  });
});
