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
            retrieve: jest.fn(),
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
    jest.spyOn(postsService, 'retrieve').mockResolvedValue(expectedPost as any);

    // Act
    const result = await postsController.retrieve(id);

    // Assert
    expect(postsService.retrieve).toHaveBeenCalledWith(1);
    expect(result).toEqual(expectedPost);
  });

  it('should handle non-numeric id gracefully', async () => {
    // Arrange
    const id = 'abc';

    // Act
    const result = await postsController.retrieve(id);

    // Assert
    expect(postsService.retrieve).toHaveBeenCalledWith(NaN);
    expect(result).toBeUndefined();
  });

  it('should handle service errors gracefully', async () => {
    // Arrange
    const id = '1';
    jest
      .spyOn(postsService, 'retrieve')
      .mockRejectedValue(new Error('Service Error'));

    // Act
    let error;
    try {
      await postsController.retrieve(id);
    } catch (e) {
      error = e;
    }

    // Assert
    expect(postsService.retrieve).toHaveBeenCalledWith(1);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Service Error');
  });
});
