export abstract class UseCase<T = any> {
  abstract execute(...args: any[]): Promise<T>;
}
