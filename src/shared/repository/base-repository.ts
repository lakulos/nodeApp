export abstract class BaseRepository<T> {
  abstract create(data: any): Promise<T>;
  abstract findOne(data: any, searchType: 'OR' | 'AND'): Promise<T>;
  abstract findAll(filter: Record<string, any>): Promise<T[]>;
  abstract update(id: any, data: any): Promise<T>;
}
