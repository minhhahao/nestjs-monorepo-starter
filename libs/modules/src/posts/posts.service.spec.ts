import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { DatabaseService } from '@app/database';

describe('PostsService', () => {
  let service: PostsService;
  let prisma: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: DatabaseService,
          useValue: {
            post: {
              findUnique: jest.fn(), // Mock the findUnique method
            },
            // Mock methods of DatabaseService as needed
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prisma = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    // Act
    const result = service;

    // Assert
    expect(result).toBeDefined();
  });

  it('should call prisma method successfully', async () => {
    // Arrange
    const mockPost = { id: 1, title: 'Test Post' };
    prisma.post.findUnique = jest.fn().mockResolvedValue(mockPost);

    // Act
    const result = await service.findOne(1);

    // Assert
    expect(prisma.post.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockPost);
  });

  it('should handle post not found', async () => {
    // Arrange
    prisma.post.findUnique = jest.fn().mockResolvedValue(null);

    // Act
    const result = await service.findOne(999);

    // Assert
    expect(prisma.post.findUnique).toHaveBeenCalledWith({ where: { id: 999 } });
    expect(result).toBeNull();
  });

  it('should handle database errors gracefully', async () => {
    // Arrange
    prisma.post.findUnique = jest
      .fn()
      .mockRejectedValue(new Error('Database error'));

    // Act
    let error;
    try {
      await service.findOne(1);
    } catch (e) {
      error = e;
    }

    // Assert
    expect(prisma.post.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(error).toBeDefined();
    expect(error.message).toBe('Database error');
  });
});
