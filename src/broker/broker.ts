import { Inject, Injectable, Logger } from '@nestjs/common';
import { prisma } from '@shared/repository/repository-config';
import { Usecase } from './type';

@Injectable()
export class Broker {
  private readonly logger = new Logger(Broker.name);
  private readonly prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  async runUsecases<T>(
    usecases: Usecase[],
    initialArguments: Record<string, any> = {},
  ): Promise<T | any> {
    return this.prisma.$transaction(async (prisma) => {
      this.logger.debug(`Running ${usecases.length} usecases`);
      this.logger.debug(`Initial args: ${JSON.stringify(initialArguments)}`);

      let results = { ...initialArguments };

      for (const useCase of usecases) {
        this.logger.debug(`Running usecase: ${useCase.constructor.name}`);
        const result = await useCase.execute(results);
        results = { ...results, ...result };
      }

      //Remove initial args from results
      for (const key in initialArguments) {
        if (!Object.keys(results).includes(key) || key === 'password') {
          delete results[key];
        }
      }

      this.logger.debug(`Final results: ${JSON.stringify(results)}`);
      return results;
    });
  }
}
