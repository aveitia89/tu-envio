import { Repository } from 'typeorm';
// @ts-ignore
export const repositoryMockFactory: () => jest.Mock<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  // ...
}));
